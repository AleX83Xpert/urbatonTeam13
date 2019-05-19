import logging
from flask import Flask

from gc_core.mount import mount
from gc_core.utils import sessionify, close_conn


def factory():
    setup_logging()
    app = Flask(__name__)
    app.teardown_request(close_conn)
    app.config['SECRET_KEY'] = 'dfijhwrtyw45ihjs8o5ha'
    mount(app)
    sessionify(app)
    app.after_request(with_headers)
    return app


def setup_logging():
    logging.basicConfig(level=logging.INFO)


def with_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
