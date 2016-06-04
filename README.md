# CommunityDoodle
A simple flask-socketio web app with a shared canvas for doodling! Built with Python 2.7, Flask, Flask-socketio, & JavaScript.

Run the file 'run.py' to start the socketio server. Navigate to localhost/canvas with a compatible browser to start doodling on the canvas. Your doodles will be shared with every connected client, stroked onto their canvas. If a client presses the 'Erase Canvas' button, they are prompted to confirm as the action erases the canvas for every connected client.


Once the mousedown listener is fired, all (color, line width, x, y) coordinates the mousemove event listener picks up are added as an array to a master array. Once the mouseup listener fires, the stroke is finished so the client emits the master array to the server which redirects it to all connected clients, and the master array is cleared.
