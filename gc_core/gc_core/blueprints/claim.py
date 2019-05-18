from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args


bp_claim = Blueprint("claims", __name__)

add_args = {
    "garbage_type": fields.Str(required=True),
    "parameters": fields.Str(required=True),
}

search_args = {
    "citizensId": fields.Integer(required=False)
}

put_args = {
    "measurementUnit": fields.Str(required=True),
    "amount": fields.Float(required=True)
}


@bp_claim.route('/<collector_id>', methods=["GET"])
def get(collector_id):
    return jsonify([collector_id])


@bp_claim.route('/<collector_id>/<citizen_id>', methods=["POST"])
@use_args(add_args)
def add(args, collector_id, citizen_id):
    return jsonify([collector_id, citizen_id, args])


@bp_claim.route('/search', methods=["GET"])
@use_args(search_args)
def search(args):
    return jsonify(args)


@bp_claim.route('/<id>', methods=["DELETE"])
def delete(id):
    return jsonify([id])


@bp_claim.route('/<id>/<state>', methods=["PUT"])
@use_args(put_args)
def put(args, id, state):
    return jsonify([id, args, state])

