from datetime import timedelta
from environs import Env


class Environ(Env):
    @property
    def with_redis(self):
        return self("APP_WITH_REDIS", False)

    @property
    def expire_delta(self):
        return timedelta(days=5)


env = Environ()
