from flask import Flask

from gc_core.blueprints.test import bp_test
from gc_core.blueprints.collector import bp_collector
from gc_core.blueprints.claim import bp_claim
from gc_core.blueprints.login import bp_login
from gc_core.blueprints.citizen import bp_citizen


def mount(app: Flask):
    app.register_blueprint(bp_test, url_prefix="/test")
    app.register_blueprint(bp_collector, url_prefix="/collectors")
    app.register_blueprint(bp_claim, url_prefix="/claims")
    app.register_blueprint(bp_login, url_prefix="/login")
    app.register_blueprint(bp_citizen, url_prefix="/citizens")
