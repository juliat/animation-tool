/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.number = app.animationArea.animatedObjects.length + 1;
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.animations = [];
	this.currentAnimation = {
		startTime : 0,
		movements :[]
	}
	this.objectController = null;
	this.imageFile = imageFile;
	this.canvasElement = null;
	this.addToAnimatedArea();
	this.paused = false; // might delete this
}

AnimatedObject.prototype.addToAnimatedArea = function() {
	var animatedObject = this;

	var img = new Image();
	img.src =this.imageFile;
	
	img.onload = function() {
	    var kineticImage = new Kinetic.Image({
	      x: 0,
	      y: 0,
	      image: img,
	      draggable: false
	    });

	    var layer = new Kinetic.Layer();

	    // add the shape to the layer
	    layer.add(kineticImage);

	    // add the layer to the stage
	    app.animationArea.stage.add(layer);
	 	
	 	// save kinetic object to object
		animatedObject.canvasElement = kineticImage;
		animatedObject.bindMovementEvents();
	 };

	this.createController();
}

AnimatedObject.prototype.bindMovementEvents = function() {
	var animatedObject = this;
	// this should work on dragstart but is being buggy :/
	var startMoveTime;
	this.canvasElement.on('click', function() {
		animatedObject.select();
	});
	this.canvasElement.on('dragstart', function(event) {
		// debugger;
		startMoveTime = event.timeStamp;
	})
	this.canvasElement.on('dragmove', function(event){
		// console.log('dragmove');
		movement = {
			y: event.y,
			x: event.x,
			deltaTimestamp: event.timeStamp - startMoveTime
		}
		animatedObject.recordMovement(movement);
	});
	this.canvasElement.on('dragend', function() {
		console.log('dragend');	
		// save this animation and get ready to record another
		debugger;
		animatedObject.animations.push(animatedObject.currentAnimation);
		animatedObject.currentAnimation = {};
	});
}

AnimatedObject.prototype.createController = function() {
	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';

	// could not use app var here and just go straight to DOM. tradeoffs?
	app.objectsListControl.append('<li id="' + objectControllerId + '">'+ this.number + ") " + this.objectName + '</li>');
	this.objectController = $('#'+ objectControllerId);

	var animatedObj = this;

	// bind a click selection event to the controller
	this.objectController.bind('click', function() {
		console.log('clicked '+ objectControllerId);
		animatedObj.select();
	});
}

/* written for DOM, not kinetic.js */
AnimatedObject.prototype.select = function() {
	// deselect and disable all draggable objects
	$('#objectsList li').removeClass('selected');
	var allObjects = app.animationArea.animatedObjects;
	var i;
	for (i = 0; i < allObjects.length; i++) {
		var obj = allObjects[i].canvasElement;
		obj.setDraggable(false);
	}
	
	// and only select and enable this one
	this.objectController.addClass('selected');
	this.canvasElement.setDraggable(true)
}

AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function() {
	console.log('play');
	var animation = this.animations[0];
	var numMovements = animation.movements.length;
	var i = 1;
	while (i < numMovements) {
		var movement = animation.movements[i];
		var lastMovement = animation.movements[i-1];
		var duration = movement['deltaTimestamp'] - lastMovement['deltaTimestamp'];
		movement['duration'] = duration;
		if (this.paused === false) {
			this.performMovement(movement);
		}
		i++;
	}
}

AnimatedObject.prototype.pauseAnimation = function() {
	this.paused = true;
}

AnimatedObject.prototype.performMovement = function(movement) {
	this.canvasElement.transitionTo(
		{
		'x': movement['x'],
		'y': movement['y'],
		'duration': movement['duration']
		}
	);
}

AnimatedObject.prototype.recordMovement = function(movement) {
	this.currentAnimation.movements.push(movement);
	console.log(this.currentAnimation.movements);
}