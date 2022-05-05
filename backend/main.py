from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
import pymysql
from datetime import datetime
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@%s/%s' % ('root', 'aaaaaa', 'localhost:3306', 'visiable_base')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
        return {
            "time": self.time.strftime('%Y-%m-%d %H:%M:%S'),
            "rank": self.rank,
            "latitude": self.latitude,
            "longtitude": self.longtitude,
            "depth": self.depth,
            "site": self.site,
            "country": self.country,
            "province": self.province,
        }


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


@app.route('/api/all', methods=['GET'])
def get_data():
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    page_size = request.args.get('page_size', type=int, default=10)

    digits = get_digits(year, rank, country)
    digits = digits.all()
    page_sum = len(digits) // page_size
    if len(digits) % page_size:
        page_sum += 1
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "digits": [digit.to_json() for digit in digits],
            "page_sum": page_sum,
            "sum": len(digits)
        }
    })


@app.route('/api/page', methods=['GET'])
def get_page():
    year = request.args.get('year', type=int, default=2013)
    rank = request.args.get('rank', type=float, default=0.)
    country = request.args.get('country', type=str, default="")

    page_num = request.args.get('page_num', type=int, default=1)
    page_size = request.args.get('page_size', type=int, default=10)

    digits = get_digits(year, rank, country)
    digits = digits.offset(page_size * (page_num - 1)).limit(page_size)
    digits = digits.all()
    return json.dumps({
        "code": 200,
        "msg": "SUCCESS",
        "data": {
            "digits": [digit.to_json() for digit in digits],
            "sum": len(digits)
        }
    })


if __name__ == '__main__':
    app.run()
