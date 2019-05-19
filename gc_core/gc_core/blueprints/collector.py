import functools

from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, _sentinel
from gc_core.utils import execute_all, execute_one

bp_collector = Blueprint("collectors", __name__)


@bp_collector.route('/search', methods=["GET"])
@use_args({
    "garbageType": fields.Str(required=False)
})
def search(args):
    params, request = request_build(
        garbage_type=args.get("garbageType", _sentinel)
    )

    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(request, params)
        collectors = cursor.fetchall()

        @functools.lru_cache()
        def get_params(user):
            cursor.execute('select * from user_params where `user` = %s', (user))

            return cursor.fetchall()

        for raw in collectors:
            raw['params'] = {}
            result = get_params(raw['user'])
            for row in result:
                raw['params'][row['code']] = row['value']

    return jsonify(collectors)

@bp_collector.route('/', methods=["POST"])
@use_args({
    "login": fields.Str(required=True),
    "password": fields.Str(required=True)
})
def add(args):
    request = "INSERT INTO garbage_collector.`users` VALUES (null, %s, %s, now(), 'collector')"
    execute_one(request, (args["login"], args["password"]))
    id = execute_one("SELECT LAST_INSERT_ID() FROM garbage_collector.`users`", ())
    return jsonify({"id": id["LAST_INSERT_ID()"]})

def request_build(garbage_type=_sentinel):
    params = []
    request = """SELECT delivery_points.*
                 FROM `users` JOIN delivery_points ON 
                        `users`.id = delivery_points.user
                    JOIN delivery_point_garbage_types ON 
                        delivery_points.id = delivery_point_garbage_types.`point`
                    JOIN garbage_types ON 
                        garbage_types.code = delivery_point_garbage_types.`type`
                    LEFT JOIN user_params ON
                        user_params.`user` = `users`.id AND
                        user_params.code = 'on_export'
                 WHERE `users`.type='collector'"""
    if garbage_type != _sentinel:
        params.append(garbage_type)
        request += " AND garbage_types.code=%s"
    return tuple(params), request
