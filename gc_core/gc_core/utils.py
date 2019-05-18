import logging
import datetime
from functools import wraps
from flask import Flask, session, abort
from flask_session import Session

from gc_core.env import env

logger = logging.getLogger(__name__)


def sessionify(app: Flask):
    logger.info("REDIS: %s" % env.with_redis)
    if env.with_redis:
        app.config["SESSION_TYPE"] = "redis"
        Session(app)
    else:
        Session(app)


def check_auth(*roles):
    def wrapper(func):
        @wraps(func)
        def wrap(*arg, **kw):
            logger.info("SESSION: %s" % session)
            # find session
            if "username" in session and session["expire"] > datetime.datetime.now():
                session["expire"] = datetime.datetime.now() + env.expire_delta

                logger.info(roles)
                if session["role"] not in roles:
                    abort(403)

                return func(*arg, **kw)
            else:
                abort(401)

        return wrap
    return wrapper


for_citizen = check_auth("citizen", "admin")
for_collector = check_auth("collector", "admin")
for_admin = check_auth("admin")


def create_session(username, role):
    session.clear()
    session["username"] = username
    session["role"] = role
    session["expire"] = datetime.datetime.now() + env.expire_delta
