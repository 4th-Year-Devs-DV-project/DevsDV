import socketio

# create a Socket.IO server
sio = socketio.Server()

# wrap with a WSGI application
app = socketio.WSGIApp(sio)

@sio.on('connect')
def connect(sid, data):
    print(sid + " has connected")
    

@sio.on('disconnect')
def disconnect(sid, data):
    print(sid + " has disconnected")
    