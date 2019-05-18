from flask import Flask

from gc_core.blueprints.test import bp_test
from gc_core.blueprints.collector import bp_collector
from gc_core.blueprints.claim import bp_claim


def mount(app: Flask):
    app.register_blueprint(bp_test, url_prefix="/test")
    app.register_blueprint(bp_collector, url_prefix="/collector")
    app.register_blueprint(bp_claim, url_prefix="/claim")
