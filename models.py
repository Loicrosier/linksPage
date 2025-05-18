from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    link = db.Column(db.String(500), nullable=False)
    platform = db.Column(db.String(100), nullable=False)
    # date = db.Column(db.Datetime, default=datetime.utcnow)
