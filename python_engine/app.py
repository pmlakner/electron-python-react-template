from api.server.server import sio, launch_server

app = launch_server()

if __name__ == '__main__':
    print('[INFO] Starting server at http://localhost:5000')
    sio.run(app=app, host='127.0.0.1', port=5000, debug=True, use_reloader=True)
    print("not here")

