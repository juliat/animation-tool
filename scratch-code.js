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


		// save this animation and get ready to record another
		// debugger;
		animatedObject.animations.push(animatedObject.currentAnimation);
		animatedObject.currentAnimation = {
			startTime: 0,
			movements : []
		};




	var playButtonElement = $('#play');
	/*
	playButtonElement.on('tap', function() {
		app.timer.clear();
		app.timer.start();
		app.timer.bind(this.frameInterval + ' milliseconds', function(){
			app.currentTime = app.timer._ticks;
			animationArea.moveObjects(app.currentTime);
		})	
	});
	*/
	playButtonElement.bind('click', function() {
		console.log('play');
		app.timer.clear();
		app.timer.start();
		app.timer.bind(this.frameInterval*2 + ' milliseconds', function(){
			app.currentTime = app.timer._ticks;
			animationArea.moveObjects(app.currentTime);
		});
	});


	AnimatedObject.prototype.hide = function() {
	this.hidden = true;
	this.canvasElement.hide();
	this.objectController.hide();
}
