from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args
from hashlib import md5

from gc_core.utils import get_conn, for_collector, execute_all, execute_one, get_last_id


bp_citizen = Blueprint("citizens", __name__)


@bp_citizen.route("/search", methods=["GET"])
@use_args({
    "login": fields.Str(required=False)
})
@for_collector
def search(args):
    request = "SELECT `id`, `login` FROM `users` WHERE `type`='citizen' AND `login` LIKE %s"
    result = execute_all(request, ('%' + args["login"]) + '%')
    
    return jsonify(result)

@bp_citizen.route("/", methods=["GET"])
@use_args({
})
@for_collector
def get_all(args):
    request = "SELECT * FROM `users`"
    result = execute_all(request, ())
    
    return jsonify(result)

@bp_citizen.route("/", methods=["POST"])
@use_args({
    "login": fields.Str(required=True),
    "password": fields.Str(required=True)
})
def add(args):
    search_request = "SELECT `id` FROM `users` WHERE `type`='citizen' AND `login` = %s"
    found_users = execute_all(search_request, (args["login"]))
    if len(found_users) != 0:
        return "User '" + args["login"] + "' already exist!", 400
    
    passowrd_hash = md5(args["password"].encode('utf-8')).hexdigest()
    request = "INSERT INTO garbage_collector.`users` VALUES (null, %s, %s, now(), 'citizen')"
    citizen_info = (args["login"], passowrd_hash)
    execute_one(request, citizen_info)
    id = get_last_id("`users`")
    return jsonify({"id": id})

@bp_citizen.route("/<id>", methods=["DELETE"])
def delete(id):
    request = "DELETE FROM garbage_collector.`users` WHERE id=%s"
    execute_one(request, (id))
    return "0k"

@bp_citizen.route("/<id>/points", methods=["GET"])
def get_points(id):
    request = "SELECT Loyalty FROM gamefication_state WHERE UserId = %s"
    result = execute_one(request, (id))
    
    return jsonify(result)
