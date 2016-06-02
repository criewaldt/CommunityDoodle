from flask import session, request
from flask.ext.socketio import emit, join_room, leave_room, rooms
from .. import socketio



#draw
@socketio.on('inbound', namespace='/')
def draw(message):
    emit('draw', {'user': 'test user', 'data':message}, broadcast=True)


#clear
@socketio.on('clear', namespace='/')
def clear(message):
    emit('clearCanvas', {}, broadcast=True)

#headcount
@socketio.on('present', namespace="/")
def headcount(message):
    _id = request.sid
    emit('headcount', {'id':_id}, broadcast=True)


@socketio.on('left', namespace="/")
def left(message):
    pass
