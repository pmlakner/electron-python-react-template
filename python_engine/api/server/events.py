import sys
import uuid

sys.path.extend(['C:\\Users\\Welaptega\\CMSv3-app\\CMSv3\\python_engine', 'C:/Users/Welaptega/CMSv3-app/CMSv3/python_engine'])

import os
import subprocess
import sys
from threading import Condition

import eventlet
from flask import request

from api.server.server import sio

eventlet.monkey_patch()

app_session_id = "session_id"
ui_mode = "SPLASH"


@sio.on('hello_from_web', namespace='/web')
def web_hello():
    sio.emit('hello_from_backend', namespace='/web')


@sio.on('window_ready', namespace='/elec')
def window_ready():
    sio.emit('show_window', namespace='/elec')


@sio.on('connect', namespace='/web')
def connect_web():
    print('[INFO] Web client connected: {}'.format(request.sid))
    global app_session_id
    # create a unique session id for each ui connection
    app_session_id = uuid.uuid4().hex
    sio.emit('server_ready', namespace='/web')


@sio.on('disconnect', namespace='/web')
def disconnect_web():
    shutdown_app()
    print('[INFO] Web client disconnected: {}'.format(request.sid))


@sio.on('connect', namespace='/elec')
def connect_electron():
    sio.emit('connected', namespace='/elec')


@sio.on('disconnect', namespace='/elec')
def disconnect_electron():
    print('disconnect electron?')
    shutdown_app()


def shutdown_app():
    print("App shutting down")
    os._exit(0)

