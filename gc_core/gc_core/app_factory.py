import logging
from flask import Flask


def factory():
    setup_logging()
    app = Flask(__name__)
    return app


def setup_logging():
    logging.basicConfig(level=logging.INFO)
