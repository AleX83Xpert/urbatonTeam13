from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

bp_claim = Blueprint("claim", __name__)

hello_args = {
    "garbage_type": fields.Str(required=True),
    "parameters": fields.Str(required=True),
}


@bp_claim.route('/<collector_id>/<citizen_id>', methods=["POST"])
@use_args(hello_args)
def get(collector_id, citizen_id, args):
    return jsonify([collector_id, citizen_id, args])
