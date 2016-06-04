# CommunityDoodle
A simple flask-socketio web app with a shared canvas for doodling! Built with Flask, Flask-socketio, & JavaScript.

Run the file 'run.py' to start the socketio server. Navigate to localhost/canvas with a compatible browser to start doodling on the canvas.

Once connected, your doodles will be shared with every client connected. Also, if any client erases the canvas, all connected client canvases will be erased.


Once the mousedown listener is fired, all (color, line width, x, y) coordinates the mousemove event listener picks up are added as an array to a master array. Once the mouseup listener fires, the client emits the master array to the server which redirects it to all connected clients, and the master array is cleared.
