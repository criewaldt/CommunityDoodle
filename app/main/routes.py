from flask import session, redirect, url_for, render_template, request
from . import main
from .forms import LoginForm
import datetime
import json
from flask.ext.socketio import rooms

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/canvas')
def canvas():
    return render_template('canvas.html')


