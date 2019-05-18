import hashlib

from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from . import goodObject


bp_login = Blueprint("login", __name__)

post_args = {
    "login": fields.Str(required=True),
    "password": fields.Str(required=True)
}

@bp_login.route('/', methods=["GET"])
def get():
    with goodObject.connection.cursor() as cursor:
        cursor.execute('select * from garbage_types;')
        result = cursor.fetchall()
        print(result)
    return jsonify({"id": 14, "role": "admin"})


@bp_login.route('/', methods=["POST"])
@use_args(post_args)
def post(args):
    print("sign in user by login=" + args["login"])
    id = signin(args["login"], hashlib.md5(args["password"].encode('utf-8')).hexdigest())
    return jsonify(id)

def signin(login, passwordMd5):
    request = "SELECT `id` FROM `users` WHERE `login`=%s AND `password`=%s"
    with goodObject.connection.cursor() as cursor:
        cursor.execute(request, (login, passwordMd5))
        result = cursor.fetchone()
        return result
