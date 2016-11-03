# CommunityDoodle
A flask-socketio web app with a shared canvas for doodling!

##Ingredients
Python 2.7 env, Flask, flask-socketio, & JavaScript.

##How to use
- Run the file 'run.py' to start the socketio server.

- Navigate to localhost with a compatible browser to start doodling on the canvas. Your doodles will be shared with every connected client, stroked onto their canvas. If a client presses the 'Erase Canvas' button, they are prompted to confirm as the action erases the canvas for every connected client

##Under the hood
- Once the mousedown listener is fired, all (color, line width, x, y) coordinates the mousemove event listener picks up are added as an array to a master array. Once the mouseup listener fires, the stroke is finished so the client emits the master array to the server which redirects it to all connected clients, and the master array is cleared.

###With help from
[html5 canvas element info](https://dev.opera.com/articles/html5-canvas-painting)

[Flask-socketio-Chat](https://github.com/miguelgrinberg/Flask-SocketIO-Chat)
