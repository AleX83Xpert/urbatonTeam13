from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from . import goodObject
import pymysql.cursors

bp_garbage = Blueprint("garbages", __name__)

@bp_garbage.route("/types", methods=["GET"])
def search():
    print("getting all garbages types")
    garbage_types = finall()
    return jsonify(garbage_types)

def finall():
    request = "SELECT * FROM `garbage_types`"
    with goodObject.connection.cursor() as cursor:
        cursor.execute(request)
        result = cursor.fetchall()
        return result
