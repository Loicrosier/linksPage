from flask import Flask, redirect, render_template, url_for, request, jsonify
from models import db, Link
import json
import os
from dotenv import load_dotenv

app = Flask(__name__)
# charge les var environnement
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


icons = {
    "snapchat": 'fa-brands fa-snapchat',
    "telegram": 'fa-brands fa-telegram',
    "whatsapp": "fa-brands fa-whatsapp"
}

@app.route('/', methods=['GET'])
def main():
    admin = request.args.get('admin')
    links = Link.query.all()
    return render_template('main.html', links=links, adminid=os.getenv('ADMIN_ID'), admin=admin, icons=icons)

@app.route('/create_link', methods=['POST'])
def create_link():
    name = request.form.get('name')
    link = request.form.get('link')
    platform = request.form.get('platform')
    password = request.form.get('password')
    if os.getenv('ADMIN_PASSWORD') == password:
         link = Link(name=name, link=link, platform=platform)
         db.session.add(link)
         db.session.commit()
    return redirect('/')

@app.route('/del_link/<link>', methods=['DELETE'])
def del_link(link):
    password = request.json['password']
    
    if os.getenv('ADMIN_PASSWORD') == password:
        link = Link.query.get(int(link))
        if link:
            db.session.delete(link)
            db.session.commit()
            return jsonify({"resp": 'deleted'})
        else:
            return jsonify({"resp": 'erreur pendant la suppression !'})

    return jsonify({ "resp": 'mauvais mot de passe !'})


if __name__ == '__main__':
    app.run(debug=True)
