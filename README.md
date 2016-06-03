# CommunityDoodle
A simple flask-socketio web app with a shared canvas for doodling!

Run the file 'run.py' to start the socketio server. Navigate to localhost/canvas with a compatibale browser to start doodling on the canvas.

Once connected, your doodles will be shared with every socketio client connected. Also, if a client erases the canvas, every connected clients canvas will be erased.


Once the mouse is clicked, all x,y coordinates the event listener picks up are added to an array. Once the mouseup listener fires, the client emits the array to the server which redirects it to all connected clients.
