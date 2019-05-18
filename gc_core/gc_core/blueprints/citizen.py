from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

bp_citizen = Blueprint("citizens", __name__)

search_args = {
    "login": fields.Str(required=False)
}


@bp_citizen.route('/search', methods=["GET"])
@use_args(search_args)
def search(args):
    return jsonify(args)
