import logging

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, func, desc
import pymysql
from datetime import datetime
import json
from flask_cors import CORS
from utils import word_cloud

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@%s/%s' % ('root', 'root', 'localhost:3306', 'visiable_base')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, supports_credentials=True)
pymysql.install_as_MySQLdb()
db = SQLAlchemy(app)


class Digit(db.Model):
    __tablename__ = 'digits'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime)
    rank = db.Column(db.Float)
    latitude = db.Column(db.Float)
    longtitude = db.Column(db.Float)
    depth = db.Column(db.Float)
    site = db.Column(db.String)
    country = db.Column(db.String)
    province = db.Column(db.String)

    def to_json(self):
        try:
            res = {
                "time": self.time.strftime('%Y-%m-%d %H:%M:%S'),
                "rank": self.rank,
                "latitude": self.latitude,
                "longtitude": self.longtitude,
                "depth": self.depth,
                "site": self.site,
                "country": self.country,
                "province": self.province,
            }
        except Exception as e:
            logging.error(e)
            res = {
                "time": "",
                "rank": "",
                "latitude": "",
                "longtitude": "",
                "depth": "",
                "site": "",
                "country": "",
                "province": "",
            }
        return res

    def to_map(self):
        try:
            res = {
                "name": self.site,
                "country": self.country,
                "province": self.province,
                "depth": self.depth,
                "value": [
                    self.longtitude,
                    self.latitude,
                    self.rank,
                    int(self.time.strftime("%j"))
                ]
            }
        except Exception as e:
            logging.error(e)
            res = {
                "name": "",
                "country": "",
                "province": "",
                "depth": "",
                "value": [0, 0, 0, 0]
            }
        return res


def get_digits(year: int, rank: float, country: str = ""):
    digits = Digit.query.filter(
        and_(
            Digit.rank >= rank,
            Digit.time > datetime(year - 1, 12, 31, 23, 59, 59),
            Digit.time <= datetime(year, 12, 31, 23, 59, 59),
        )
    )
    if country:
        digits = digits.filter_by(country=country)
    return digits


@app.route('/api/last', methods=['GET'])
def get_last():
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    digits = get_digits(year, rank, country)
    last = digits.order_by(Digit.time.desc()).first()
    if not last:
        last = Digit()
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "last": last.to_json()
        }
    })


@app.route('/api/all', methods=['GET'])
def get_data():
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    digits = get_digits(year, rank, country)
    digits = digits.all()
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "digits": [digit.to_json() for digit in digits],
            "sum": len(digits)
        }
    })


@app.route('/api/map', methods=['GET'])
def get_map():
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    digits = get_digits(year, rank, country)
    digits = digits.all()
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "digits": [digit.to_map() for digit in digits],
            "sum": len(digits)
        }
    })


@app.route('/api/page/<page_type>', methods=['GET'])
def get_page(page_type: str):
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    page_num = request.args.get('page_num', type=int, default=1)
    page_size = request.args.get('page_size', type=int, default=10)

    digits = get_digits(year, rank, country)
    if country:
        if page_type == 'size':
            digits = digits.with_entities(
                Digit.province.label('area'),
                func.max(Digit.rank).label('num')
            ).group_by(Digit.province).order_by(desc('num'))
        else:
            digits = digits.with_entities(
                Digit.province.label('area'),
                func.count('*').label('num')
            ).group_by(Digit.province).order_by(desc('num'))
    else:
        if page_type == 'size':
            digits = digits.with_entities(
                Digit.country.label('area'),
                func.max(Digit.rank).label('num')
            ).group_by(Digit.country).order_by(desc('num'))
        else:
            digits = digits.with_entities(
                Digit.country.label('area'),
                func.count('*').label('num')
            ).group_by(Digit.country).order_by(desc('num'))

    digits_query = digits.paginate(page_num, page_size)
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "digits": [{"area": digit[0], "num": digit[1]} for digit in digits_query.items],
            "total": digits_query.total,
            "page_sum": digits_query.pages
        }
    })


@app.route('/api/cloud/<page_type>', methods=['GET'])
def get_cloud(page_type: str):
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    digits = get_digits(year, rank, country)
    if country:
        if page_type == 'size':
            digits = digits.with_entities(
                Digit.province.label('area'),
                func.max(Digit.rank).label('num')
            ).group_by(Digit.province).order_by(desc('num'))
        else:
            digits = digits.with_entities(
                Digit.province.label('area'),
                func.count('*').label('num')
            ).group_by(Digit.province).order_by(desc('num'))
    else:
        if page_type == 'size':
            digits = digits.with_entities(
                Digit.country.label('area'),
                func.max(Digit.rank).label('num')
            ).group_by(Digit.country).order_by(desc('num'))
        else:
            digits = digits.with_entities(
                Digit.country.label('area'),
                func.count('*').label('num')
            ).group_by(Digit.country).order_by(desc('num'))

    return {
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "img": word_cloud([{"area": digit[0], "num": digit[1]} for digit in digits.all()])
        }
    }


if __name__ == '__main__':
    app.run()
