from flask import Flask, redirect, render_template, url_for, request
import json
import datetime
import os
from dotenv import load_dotenv

app = Flask(__name__)

# charge les var environnement
load_dotenv()

icons = {
    "snapchat": 'fa-brands fa-snapchat',
    "telegram": 'fa-brands fa-telegram',
    "whatsapp": "fa-brands fa-whatsapp"
}


def read_json():
    with open('links.json', 'r') as f:
       data = json.load(f)
    return data

def write_json(data):
    with open('links.json', 'w') as f:
       json.dump(data, f, indent=4)
    return

@app.route('/', methods=['GET'])
def main():
    admin = request.args.get('admin')
    links = read_json()['links']
    return render_template('main.html', links=links, admin=admin, icons=icons)

@app.route('/create_link', methods=['POST'])
def create_link():
    name = request.form.get('name')
    json_links = read_json()
    link = request.form.get('link')
    platform = request.form.get('platform')
    password = request.form.get('password')
    if os.getenv('ADMIN_PASSWORD') == password:

        json_links['links'].update({name: {"link": link, "platform": platform, "date": str(datetime.datetime.now())}})

        write_json(json_links)
    return redirect('/')

@app.route('/del_link/<link>', methods=['DELETE'])
def del_link(link):
    # if os.getenv('ADMIN_PASSWORD') == 
        json_links = read_json()
        del json_links['links'][link]
        write_json(json_links)

if __name__ == '__main__':
    app.run(debug=True)
