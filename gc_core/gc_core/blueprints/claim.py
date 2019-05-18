from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

bp_claim = Blueprint("claim", __name__)

hello_args = {"citizen_id": fields.Int(required=True)}


@bp_claim.route('/<collector_id>', methods=["POST"])
@use_args(hello_args)
def get(collector_id, args):
    return jsonify({"ok"})
