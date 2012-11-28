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


function Timer() {
    var framesPerSecond = 30;
    this.timeInterval = 1000/framesPerSecond; // 1 millisecond / 30
}

Timer.prototype.start = function(){
    this.absoluteStart = new Date().getTime();
};

Timer.prototype.currentTime = function() {
    var currentAbsoluteTime = new Date().getTime();
    var currentRelativeTime = currentAbsoluteTime - this.absoluteStart;
    return currentRelativeTime; // time since we started recording
};