import logging
from flask import Flask

from gc_core.mount import mount
from gc_core.utils import sessionify


def factory():
    setup_logging()
    app = Flask(__name__)
    mount(app)
    sessionify(app)
    return app


def setup_logging():
    logging.basicConfig(level=logging.INFO)
