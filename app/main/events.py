from flask import session, request
from flask.ext.socketio import emit, join_room, leave_room, rooms
from .. import socketio
from random import randint



#draw
@socketio.on('inbound', namespace='/')
def draw(message):
    emit('draw', {'user': request.sid, 'data':message}, broadcast=True)


#clear
@socketio.on('clear', namespace='/')
def clear(message):
    emit('clearCanvas', {}, broadcast=True)

    
#join
@socketio.on('present', namespace="/")
def present(message):
    emit('assignId', {'socketId':request.sid}, broadcast=True)

@socketio.on('left', namespace="/")
def left(message):
    pass

