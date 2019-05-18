from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn


bp_collector = Blueprint("collectors", __name__)


@bp_collector.route('/search', methods=["GET"])
@use_args({
    "garbageType": fields.Str(required=False)
})
def search(args):
    request = """SELECT delivery_points.*
                     FROM `users` JOIN delivery_points ON `users`.id = delivery_points.user
                        JOIN delivery_point_garbage_types ON delivery_points.id = delivery_point_garbage_types.`point`
                        JOIN garbage_types ON garbage_types.code = delivery_point_garbage_types.`type`
                     WHERE `users`.type='collector' AND garbage_types.code=%s"""
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(request, (args['garbageType']))
        result = cursor.fetchall()

    return jsonify(result)
