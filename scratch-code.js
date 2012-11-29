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

AnimationArea.prototype.pauseAllAnimations = function() {
	debugger;
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i];
		animatedObject.pauseAnimation();
	}
};


	var animatedObj = this;

	// bind a click selection event to the controller
	this.objectController.bind('click', function() {
		console.log('clicked '+ objectControllerId);
		if (animatedObj.isSelected === true) {
			animatedObj.deselect();
		}
		else {
			animatedObj.select();
		}
	});

	AnimatedObject.prototype.deselect = function() {
	if (this.isSelected === true) {
		this.objectController.removeClass('selected');
		this.canvasElement.setDraggable(false);
		this.isSelected = false;
	}
}

AnimatedObject.prototype.select = function() {
	if (this.isSelected === false) {
		/*
		// deselect and disable all draggable objects
		$('#objectsList li').removeClass('selected');
		var allObjects = app.animationArea.animatedObjects;
		var i;
		for (i = 0; i < allObjects.length; i++) {
			var obj = allObjects[i].canvasElement;
			obj.setDraggable(false);
			this.isSelected = false;
		}
		*/
		// and only select and enable this one
		this.objectController.addClass('selected');
		this.canvasElement.setDraggable(true);
		this.isSelected = true;
	}
}

AnimatedObject.prototype.deselect = function() {

}


	this.canvasElement.on('mouseenter touchstart', function() {
		console.log('mouseenter or touchstart');
		animatedObject.select();
	});


		this.canvasElement.on('dragend touchend', function() {
		animatedObject.deselect();
	});
	this.canvasElement.on('mouseexit', function(){
		animatedObject.deselect();
	})

	
AnimatedObject.prototype.playAnimation = function() {
	if (this.animation.length !== 0) {
		var animation = this.animation;
		var numMovements = animation.movements.length;
		var i = 1;
		while (i < numMovements) {
			var movement = animation.movements[i];
			var lastMovement = animation.movements[i-1];
			var duration = movement['deltaTimestamp'] - lastMovement['deltaTimestamp'];
			movement['duration'] = duration;
			var animatedObject = this;

			if (this.paused === false) {
				// closure to make sure movement var works
				(function(movement) {
					setTimeout(function(){
						animatedObject.performMovement(movement)
					}, movement['deltaTimestamp']);
				}(movement));
			}
			i++;
		}
	}
}