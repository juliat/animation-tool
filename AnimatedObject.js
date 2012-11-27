/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.number = app.animationArea.animatedObjects.length + 1;
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.animation = [];
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
		movement = {
			y: event.y,
			x: event.x,
			deltaTimestamp: event.timeStamp - startMoveTime
		}

		animatedObject.recordMovement(movement);
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
	var numMovements = this.animation.length;
	var i = 1;
	while (i < numMovements) {
		var movement = this.animation[i];
		var lastMovement = this.animation[i-1];
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
	this.animation.push(movement);
}