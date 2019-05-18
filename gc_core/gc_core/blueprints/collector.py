from flask import Blueprint, jsonify

bp_collector = Blueprint("collector", __name__)


@bp_collector.route('/', methods=["GET"])
def get():
    return jsonify(["collector1", "collector2"])
