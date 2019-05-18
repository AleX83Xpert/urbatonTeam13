from flask import Blueprint

bp_test = Blueprint("test", __name__)


@bp_test.route('ping', methods=["GET"])
def ping():
    return "pong"
