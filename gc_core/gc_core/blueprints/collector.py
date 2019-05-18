from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

bp_collector = Blueprint("collectors", __name__)

search_args = {
    "garbageType": fields.Str(required=False)
}


@bp_collector.route('/search', methods=["GET"])
@use_args(search_args)
def search(args):
    return jsonify(args)
