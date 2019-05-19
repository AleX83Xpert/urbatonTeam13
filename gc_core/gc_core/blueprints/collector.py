import functools

from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, _sentinel
from gc_core.utils import execute_all, execute_one, get_last_id, execute

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
    "password": fields.Str(required=True),
    "on_export": fields.Integer(required=True),
    "name": fields.Str(required=False)
})
def add(args):
    request = "INSERT INTO garbage_collector.`users` VALUES (null, %s, md5(%s), now(), 'collector')"
    execute(request, (args.pop("login"), args.pop("password")))
    id = get_last_id("`users`")
    for key, values in args.items():
        execute("INSERT INTO garbage_collector.user_params (`user`, `code`, `value`) values (%s, %s, %s)",
                (id, key, values))
    return jsonify({"id": id})

@bp_collector.route('/<id>/deliveryPoint', methods=["PUT"])
@use_args({
    "address": fields.List(fields.Str()),
    "x": fields.Int(required=True),
    "y": fields.Int(required=True),
    "garbageTypes": fields.List(fields.Str(), required=True)
})
def add_delivery_point(args, id):
    request = "INSERT INTO garbage_collector.`delivery_points` VALUES (null, %s, %s, %s, %s)"
    execute_one(request, (args["x"], args["y"], args["address"], id))
    delivery_point_id = get_last_id("`delivery_points`")
    
    gt_request = "INSERT INTO garbage_collector.delivery_point_garbage_types VALUES (null, %s, %s)"
    for garbage_type in args["garbageTypes"]:
        id = find_garbage_type(garbage_type)
        execute_one(gt_request, (id, delivery_point_id))
    
    return jsonify({"id": delivery_point_id})

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

def find_garbage_type(garbage_type):
    request = "SELECT code FROM `garbage_types` WHERE code=%s"
    result = execute_one(request, (garbage_type))
    return result["code"]
