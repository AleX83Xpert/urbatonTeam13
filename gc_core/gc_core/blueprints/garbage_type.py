from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, execute_all, execute_one


bp_garbage = Blueprint("garbages", __name__)

@bp_garbage.route("/types", methods=["GET"])
def get():
    request = "SELECT * FROM `garbage_types`"
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(request)
        result = cursor.fetchall()
    
    return jsonify(result)

@bp_garbage.route("/types", methods=["POST"])
@use_args({
    "code": fields.Str(required=True),
    "name": fields.Str(required=True),
    "unit": fields.Str(required=True)
})
def add(args):
    search_request = "SELECT code FROM garbage_types WHERE code = %s"
    found_users = execute_all(search_request, (args["code"]))
    if len(found_users) != 0:
        return "Garbage type '" + args["code"] + "' already exist!", 400
    
    request = "INSERT INTO garbage_types VALUES (%s, %s, %s)"
    garbage_info = (args["code"], args["name"], args["unit"])
    execute_one(request, garbage_info)
    return jsonify({"code": args["code"]})

@bp_garbage.route("/types/<code>", methods=["DELETE"])
def delete(code):
    request = "DELETE FROM garbage_types WHERE code=%s"
    execute_one(request, (code))
    return "0k"
