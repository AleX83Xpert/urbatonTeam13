from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from . import goodObject
import pymysql.cursors

bp_citizen = Blueprint("citizens", __name__)

search_args = {
    "login": fields.Str(required=False)
}

@bp_citizen.route("/search", methods=["GET"])
@use_args(search_args)
def search(args):
    print("searching citizens by login=" + args["login"])
    users = search_by(args["login"])
    return jsonify(users)

def search_by(login):
    request = "SELECT `id`, `login` FROM `users` WHERE `type`='citizen' AND `login` LIKE %s"
    with goodObject.connection.cursor() as cursor:
        cursor.execute(request, ('%' + login + '%'))
        result = cursor.fetchall()
        return result
