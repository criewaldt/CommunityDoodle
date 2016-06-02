/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */
var context;


// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
  window.addEventListener('load', function () {
    
    
    
    //canvas
    var canvas, tool;
  
    function init () {
      // Find the canvas element.
      canvas = document.getElementById('imageView');
      if (!canvas) {
        alert('Error: I cannot find the canvas element!');
        return;
      }
  
      if (!canvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
      }
  
      // Get the 2D canvas context.
      context = canvas.getContext('2d');
      if (!context) {
        alert('Error: failed to getContext!');
        return;
      }
  
      // Pencil tool instance.
      tool = new tool_pencil();
  
      // Attach the mousedown, mousemove and mouseup event listeners.
      canvas.addEventListener('mousedown', ev_canvas, false);
      canvas.addEventListener('mousemove', ev_canvas, false);
      canvas.addEventListener('mouseup',   ev_canvas, false);
    }
    
  
    // This painting tool works like a drawing pencil which tracks the mouse 
    // movements.
    function tool_pencil () {
      var tool = this;
      this.started = false;
      
      
      this.eventList = [];
      
      // This is called when you start holding down the mouse button.
      // This starts the pencil drawing.
      this.mousedown = function (ev) {
          context.beginPath();
          var color = "#"+document.getElementById("color").value;
          tool.eventList.push([color, ev._x, ev._y]);
          context.moveTo(ev._x, ev._y);
          tool.started = true;
        };
  
      // This function is called every time you move the mouse. Obviously, it only 
      // draws if the tool.started state is set to true (when you are holding down 
      // the mouse button).
      this.mousemove = function (ev) {
        if (tool.started) {
          
          //draw the coordinates
          context.beginPath();
          
          var color = "#"+document.getElementById("color").value;
          context.strokeStyle=color;
          var lineWidth = document.getElementById("lineWidth").value;
          context.lineWidth = lineWidth
          context.arc(ev._x,ev._y,lineWidth,0,2*Math.PI);
          context.stroke();
          
          //update the active user count
          // 'Modern' browsers (IE8+, use CSS-style selectors)
          //document.querySelector('.activeUsers').innerHTML = 12;
          
          // Using the jQuery library
          //$('.results').html('Hello World!');
          
          //add draw coordinates to event list
          tool.eventList.push([color, lineWidth, ev._x, ev._y]);
          
          
          
          
        }
      };
      
      
  
      // This is called when you release the mouse button.
      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          if (tool.eventList.length > 1) {
            
              //log the event list!
              console.log(tool.eventList);
              socket.emit('inbound', tool.eventList);
              
              
              
          };
          
          tool.eventList = [];
          tool.started = false;
        }
      };
      
    }
    
    
    
    
  
    // The general-purpose event handler. This function just determines the mouse 
    // position relative to the canvas element.
    function ev_canvas (ev) {
      if (ev.layerX || ev.layerX == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
      }
  
      // Call the event handler of the tool.
      var func = tool[ev.type];
      if (func) {
        func(ev);
      }
    }
  
    init();
  
  }, false);
}

function clearCanvas () {
  var txt;
  var r = confirm("Are you sure you want to clear the canvas? This will clear the canvas for everyone.");
  if (r == true) {
      txt = "You cleared the canvas for everyone!";
      socket.emit('clear', {});
      alert(txt);
  } 
  
}

var socket;
$(document).ready(function(){
    socket = io.connect('http://' + document.domain + ':' + location.port + '/');
    var activeUsers = [];
    socket.emit('present', {});
    socket.on('draw', function(data) {
        
        document.querySelector('.socketInfo').innerHTML = 'someone is doodling!';
        function drawStuff(item) {
            context.beginPath();
            var color = item[0];
            context.strokeStyle=color;
            var lineWidth = item[1];
            context.lineWidth = lineWidth
            context.arc(item[2],item[3],lineWidth,0,2*Math.PI);
            context.stroke();
        };
        data.data.forEach(drawStuff);
        
    });

    socket.on('clearCanvas', function(data) {
        //clear canvas
        var canvas = document.getElementById("imageView");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 640, 480);
        document.querySelector('.socketInfo').innerHTML = "The canvas has been cleared."
    });
    
    socket.on('headcount', function(data) {
        
        if (activeUsers.indexOf(data.id) <= -1) {
            activeUsers.push(data.id);
        }   
        
        //document.querySelector('.activeUsers').innerHTML = activeUsers.length;
    });
    
  
    
    
    
    
});
function leave_room() {
    socket.emit('left', {}, function() {
        socket.disconnect();

        // go back to the login page
        window.location.href = "{{ url_for('main.index') }}";
    });

};	

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:

