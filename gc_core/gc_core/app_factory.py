import logging
from flask import Flask

from gc_core.mount import mount

def factory():
    setup_logging()
    app = Flask(__name__)
    mount(app)
    return app


def setup_logging():
    logging.basicConfig(level=logging.INFO)
