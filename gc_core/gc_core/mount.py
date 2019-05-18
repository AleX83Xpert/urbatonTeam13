from flask import Flask

from gc_core.blueprints.test import bp_test


def mount(app: Flask):
    app.register_blueprint(bp_test, url_prefix="/test")
