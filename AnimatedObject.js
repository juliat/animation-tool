/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.objectName = name;
	// these are defaults
	this.sprites = [];
	this.animation = {};
	this.isSelected = false;
	this.objectController = null;
	this.imageFile = imageFile;
	this.layer = null;
	this.canvasElement = null;
	this.addToAnimatedArea();
	this.hidden = false;
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

	    animatedObject.layer = new Kinetic.Layer({
	    	'name' : animatedObject.objectName + 'Layer'
	    });

	    // add the shape to the layer
	    animatedObject.layer.add(kineticImage);

	    // add the layer to the stage
	    app.animationArea.stage.add(animatedObject.layer);

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
	this.canvasElement.on('mouseenter touchstart', function() {
		console.log('mouseenter or touchstart');
		animatedObject.select();
	});
	this.canvasElement.on('dragstart touchstart', function(event) {
		console.log('touchstart');
		startMoveTime = event.timeStamp;
		animatedObject.select();
	})
	this.canvasElement.on('dragmove touchmove', function(event){
		console.log('dragmove');
		movement = {
			y: animatedObject.canvasElement.getY(),
			x: animatedObject.canvasElement.getX(),
			deltaTimestamp: event.timeStamp - startMoveTime, // this may no longer matter
			time: app.currentTime
		}
		animatedObject.recordMovement(movement);
	});
	this.canvasElement.on('dragend touchend', function() {
		animatedObject.deselect();
	});
	this.canvasElement.on('mouseexit', function(){
		animatedObject.deselect();
	})
}

AnimatedObject.prototype.createController = function() {
	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';

	// could not use app var here and just go straight to DOM. tradeoffs?
	app.objectsListControl.append('<li id="' + objectControllerId + '" class="touchable">'+ this.objectName + '</li>');
	this.objectController = $('#'+ objectControllerId);

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
}

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

AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function() {
	console.log('play');
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

AnimatedObject.prototype.pauseAnimation = function() {
	this.paused = true;
}

AnimatedObject.prototype.performMovement = function(movement) {
	console.log('performing movement');
	console.log(movement);
	this.canvasElement.setX(movement['x']);
	this.canvasElement.setY(movement['y']);
	app.animationArea.stage.draw();
}

AnimatedObject.prototype.recordMovement = function(movement) {
	var movementTimeKey = movement['time'];
	this.animation[movementTimeKey] = movement;
	console.log(this.animation);
}