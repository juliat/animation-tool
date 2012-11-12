function init(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	// add event listener to the canvas for mouse moves 
	canvas.addEventListener('mousemove', mousemoveEvent, false);
}

function mousemoveEvent(event) {
	var x, y;

	// Get the mouse position relative to the canvas element.
	if (event.layerX || event.layerX == 0) { 
	  x = event.layerX;
	  y = event.layerY;
	} 
	// Get timestamp
	var time = event.timeStamp;

	console.log(x,y,time);
	addPoint(x, y, time);
}

var eventQueue = [];
function addPoint(x,y,time) {
	eventQueue.push([x,y, time]);
}


