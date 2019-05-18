from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

bp_login = Blueprint("login", __name__)

post_args = {
    "login": fields.Str(required=True),
    "password": fields.Str(required=True)
}

@bp_login.route('/', methods=["GET"])
def get():
    return jsonify({"id": 14, "role": "admin"})


@bp_login.route('/', methods=["POST"])
@use_args(post_args)
def post(args):
    return jsonify({"state":"ok"})
