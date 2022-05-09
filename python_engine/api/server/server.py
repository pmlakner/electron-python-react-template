from flask import Flask
from flask_socketio import SocketIO
from engineio.async_drivers import eventlet

sio = SocketIO()
sio.async_handlers = False
sio.async_mode = "threading"
import api.server.events


def launch_server(debug=False):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    # sio.init_app(app, cors_allowed_origins="*", logger=True, engineio_logger=True)
    sio.init_app(app, cors_allowed_origins="*")
    return app
