import pymysql
import configparser

#global_config = configparser.ConfigParser()
#global_config.read('__conf__/production.conf')
#print(global_config['mysql'])

class GoodObject:
    def __init__(self):
        self.config = {
            'mysql': {
                'host': 'hacathon.liinda.ru',
                'user': 'ubuntu',
                'password': 'qwertyasdfgh',
                'db': 'garbage_collector'
            }
        }
        self.connection = connection = pymysql.connect(
            **self.config['mysql'],
            cursorclass=pymysql.cursors.DictCursor
        )


goodObject = GoodObject()