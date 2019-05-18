from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, for_auth


bp_claim = Blueprint("claims", __name__)


@bp_claim.route('/<collector_id>/<citizen_id>', methods=["POST"])
@use_args({
    "garbage_type": fields.Str(required=True)
})
@for_auth
def add(args, collector_id, citizen_id):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute("insert into claims (create_time, state, creator, executor) values (now(), 0, %s, %s);",
                       (citizen_id, collector_id))
        cursor.execute('SELECT LAST_INSERT_ID() as id FROM claims')
        claim_id = cursor.fetchone()['id']

        cursor.execute('select name from garbage_types where code = %s',
                       (args['garbage_type']))
        args['garbage_type'] = cursor.fetchone()['name']

        for key, value in args.items():
            cursor.execute('insert into claim_params (claim, code, value) values (%s, %s, %s);',
                           (claim_id, key, value))

    return jsonify([collector_id, citizen_id, args])


@bp_claim.route('/search', methods=["GET"])
@use_args({
    "citizensId": fields.Integer(required=False),
    "collectorsId": fields.Integer(required=False)
})
@for_auth
def search(args):
    conn = get_conn()
    with conn.cursor() as cursor:
        if 'collectorsId' in args:
            cursor.execute('select * from claims where executor = %s', (args['collectorsId']))
        elif 'citizensId' in args:
            cursor.execute('select * from claims where creator = %s', (args['citizensId']))
        else:
            return jsonify(None)
        result = cursor.fetchall()

    return jsonify(result)

@bp_claim.route('/<id>', methods=["GET"])
@for_auth
def get(id):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute('select * from claims where id = %s', (id))
        result = cursor.fetchone()
        if not result:
            return jsonify(None)

        result['params'] = {}
        cursor.execute('select * from claim_params where claim = %s', (id))
        res = cursor.fetchall()
        for raw in res:
            result['params'][raw['code']] = raw['value']

    return jsonify(result)


@bp_claim.route('/<id>', methods=["DELETE"])
@for_auth
def delete(id):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute('delete from claim_params where claim = %s', (id))
        cursor.execute('delete from claims where id = %s', (id))

    return jsonify("OK")


@bp_claim.route('/<id>/<state>', methods=["PUT"])
@use_args({
    "measurementUnit": fields.Str(required=True),
    "amount": fields.Float(required=True)
})
def put(args, id, state):
    return jsonify([id, args, state])

