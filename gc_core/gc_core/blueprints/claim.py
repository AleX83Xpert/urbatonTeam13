import json

from flask import Blueprint, jsonify, session
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, for_auth, for_collector

import time


bp_claim = Blueprint("claims", __name__)


@bp_claim.route('/<collector_id>/<citizen_id>', methods=["POST"])
@use_args({
    "garbage_type": fields.Str(required=True)
})
@for_auth
def add(args, collector_id, citizen_id):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute("insert into claims (create_time, state, creator, executor) values (now(), 'new', %s, %s);",
                       (citizen_id, collector_id))
        cursor.execute('SELECT LAST_INSERT_ID() as id FROM claims')
        claim_id = cursor.fetchone()['id']

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
            cursor.execute(
                """select c.*, u.login as citizen, u2.login as collector
                    from claims c 
                        inner join users u on u.id = c.creator
                        inner join users u2 on u.id = c.executor
                    where c.executor = %s""",
                (args['collectorsId']))
        elif 'citizensId' in args:
            cursor.execute(
                """select c.*, u.login as collector, u2.login as citizen
                    from claims c 
                        inner join users u on u.id = c.executor 
                        inner join users u2 on u.id = c.creator 
                    where c.creator = %s""",
                (args['citizensId']))
        else:
            return jsonify(None)
        result = cursor.fetchall()

        for row in result:
            row['create_time'] = row['create_time'].strftime('%Y-%m-%d %H:%M:%S')
            row['params'] = {}
            cursor.execute('select * from claim_params where claim = %s', (row['id']))
            res = cursor.fetchall()
            for raw in res:
                row['params'][raw['code']] = raw['value']

            if 'garbage_type' in row['params']:
                cursor.execute('select name from garbage_types where code = %s',
                               (row['params']['garbage_type']))
                row['params']['garbage_type'] = cursor.fetchone()['name']

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

        if 'garbage_type' in result['params']:
            cursor.execute('select name from garbage_types where code = %s',
                           (result['params']['garbage_type']))
            result['params']['garbage_type'] = cursor.fetchone()['name']

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
@for_collector
def put(args, id, state):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute('select * from claims where id = %s', (id))
        result = cursor.fetchone()
        result['params'] = {}
        cursor.execute('select * from claim_params where claim = %s', (id))
        res = cursor.fetchall()
        for raw in res.values():
            result['params'][raw['code']] = raw['value']

        citizenId = result['creator']
        collectorId = result['executor']
        timestampTicks = int(time.time() * 10000000)
        if state == "done":
            if args.get("amount", None) is None or args.get("measurementUnit", None) is None:
                raise RuntimeError("Claim state 'done' but amount not found")
            lotJson = json.dumps({
                "LotType": result['params']['garbage_type'],
                "Quantity": {
                    "MeasurementUnit": args["measurementUnit"],
                    "Value": args["amount"]
                }
            })
            cursor.execute(
                'insert into events (CitizenId, CollectorId, TimestampTicks, LotJson) values (%s, %s, %s, %s);',
                (citizenId, collectorId, timestampTicks,lotJson)
            )

            for key, value in args.items():  
                cursor.execute('insert ignore into claim_params (claim, code, value) values (%s, %s, %s);',
                               (id, key, value))
        cursor.execute('update claims set state = "%s" where id = %s', (state, id))





