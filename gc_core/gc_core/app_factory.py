import logging
from flask import Flask
from flask_cors import CORS

from gc_core.mount import mount
from gc_core.utils import sessionify, close_conn


def factory():
    setup_logging()
    app = Flask(__name__)
    app.teardown_request(close_conn)
    mount(app)
    sessionify(app)
    CORS(app)
    app.after_request(with_headers)
    return app


def setup_logging():
    logging.basicConfig(level=logging.INFO)


def with_headers(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response
