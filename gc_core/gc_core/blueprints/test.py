from flask import Blueprint

from gc_core.utils import for_collector

bp_test = Blueprint("test", __name__)


@bp_test.route("/ping", methods=["GET"])
def ping():
    return "pong"


@bp_test.route("/with_role")
@for_collector
def with_role():
    return "OK"
