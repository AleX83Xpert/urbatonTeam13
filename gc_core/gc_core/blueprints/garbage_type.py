from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn


bp_garbage = Blueprint("garbages", __name__)

@bp_garbage.route("/types", methods=["GET"])
def search():
    print("getting all garbages types")
    garbage_types = finall()
    return jsonify(garbage_types)

def finall():
    request = "SELECT * FROM `garbage_types`"
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(request)
        result = cursor.fetchall()
        return result
