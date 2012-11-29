/* Animated Object Class 
 * ================================================================
*/


/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.objectName = name;
	// these are defaults
	this.sprites = [];
	this.animation = {};
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
	      draggable: true
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
		/* running into browser security problems here */
		// animatedObject.createThumbnail();
	 };

	this.createController();
}

AnimatedObject.prototype.bindMovementEvents = function() {
	var animatedObject = this;
	// this should work on dragstart but is being buggy :/
	var startMoveTime;

	this.canvasElement.on('dragstart touchstart', function(event) {
		console.log('touchstart');
		startMoveTime = event.timeStamp;
	})
	this.canvasElement.on('dragmove touchmove', function(event){
		console.log('dragmove');
		movement = {
			y: animatedObject.canvasElement.getY(),
			x: animatedObject.canvasElement.getX(),
			deltaTimestamp: event.timeStamp - startMoveTime,
			time: app.currentTime
		}
		animatedObject.recordMovement(movement);
	});
}

AnimatedObject.prototype.createController = function() {
	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';

	$('#objectsList').append('<li id="' + objectControllerId + '" class="touchable">'+ 
							  this.objectName + 
							'</li>');

	this.objectController = $('#'+ objectControllerId);
}


AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.recordable = function(trueOrFalse) {
	this.canvasElement.setDraggable(trueOrFalse);
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


AnimatedObject.prototype.playAnimation = function() {
	if (this.animation.length !== 0) {
		var animation = this.animation;
		var numMovements = animation.movements.length;
		var i = 1;
		while (i < numMovements) {
			var movement = animation.movements[i];
			var lastMovement = animation.movements[i-1];
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

/*
AnimatedObject.prototype.createThumbnail = function() {
	var animatedObject = this;
	var config = {
		callback: function(result) {
			animatedObject.addThumbnailToController(result);
		},
		mimeType: 'image/jpeg',
		quality: 0.1
	};
	this.canvasElement.toImage(config);
}

AnimatedObject.prototype.addThumbnailToController = function(image){
	this.objectController.css({
		'background-image' : 'url('+image+');',
	});
}
*/