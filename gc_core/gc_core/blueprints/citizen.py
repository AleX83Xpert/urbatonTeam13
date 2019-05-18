from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from gc_core.utils import get_conn, for_collector


bp_citizen = Blueprint("citizens", __name__)


@bp_citizen.route("/search", methods=["GET"])
@use_args({
    "login": fields.Str(required=False)
})
@for_collector
def search(args):
    request = "SELECT `id`, `login` FROM `users` WHERE `type`='citizen' AND `login` LIKE %s"
    conn = get_conn()
    with conn.cursor() as cursor:
        cursor.execute(request, ('%' + args['login'] + '%'))
        result = cursor.fetchall()

    return jsonify(result)
