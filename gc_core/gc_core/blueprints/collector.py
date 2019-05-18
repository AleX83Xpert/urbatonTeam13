from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from . import goodObject
bp_collector = Blueprint("collectors", __name__)

search_args = {
    "garbageType": fields.Str(required=False)
}


@bp_collector.route('/search', methods=["GET"])
@use_args(search_args)
def search(args):
    print("searching collectors by garbageType=" + args["garbageType"])
    collectors = search_by(args["garbageType"])
    return jsonify(collectors)

def search_by(garbageType):
    request = """SELECT delivery_points.*
                 FROM `users` JOIN delivery_points ON `users`.id = delivery_points.user
                    JOIN delivery_point_garbage_types ON delivery_points.id = delivery_point_garbage_types.`point`
                    JOIN garbage_types ON garbage_types.code = delivery_point_garbage_types.`type`
                 WHERE `users`.type='collector' AND garbage_types.code=%s"""
    with goodObject.connection.cursor() as cursor:
        cursor.execute(request, (garbageType))
        result = cursor.fetchall()
        return result
