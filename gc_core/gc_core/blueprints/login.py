import hashlib

from flask import Blueprint, jsonify, abort
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import create_session, get_conn


bp_login = Blueprint("login", __name__)


@bp_login.route('/', methods=["GET", "POST"])
@use_args({
    "login": fields.Str(required=True),
    "password": fields.Str(required=True)
})
def login(args):
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(
            'select id, `type` from users where login = %s and password = %s;',
            (
                args["login"],
                hashlib.md5(args["password"].encode('utf-8')).hexdigest(),
            )
        )
        role = cursor.fetchone()
        if not role:
            abort(401)
        create_session(args["login"], role["type"])

    return jsonify(dict(
        id=role["id"],
        role=role["type"],
    ))
