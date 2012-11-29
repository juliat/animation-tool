/* Animated Object Class 
 * ================================================================
*/


/* Constructor */
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
}

/* Use the animatedObject's image file to create a new kinetic 
 * image that can be dragged to move it around.
*/
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

		/* trying to generate thumbnail to put in the objectController, 
		 * but running into browser security problems here 

		 * animatedObject.createThumbnail();
		 */
	 };

	// can only create the controller once the canvasElement is
	// created
	this.createController();
}


/* Bind the touch and drag events of the animatedObject so that 
 * its position can be recorded as it moves.
*/
AnimatedObject.prototype.bindMovementEvents = function() {
	var animatedObject = this;
	var startMoveTime;

	this.canvasElement.on('dragstart touchstart', function(event) {
		startMoveTime = event.timeStamp;
	});
	// record touch and drag movements
	this.canvasElement.on('dragmove touchmove', function(event){
		movement = {
			y: animatedObject.canvasElement.getY(),
			x: animatedObject.canvasElement.getX(),
			deltaTimestamp: event.timeStamp - startMoveTime,
			time: app.currentTime
		}
		animatedObject.recordMovement(movement);
	});
}


/* Create a list item to act as a controller for the animatedObject.
 * The position of a controller currently controls the zindex of the object.
 */
AnimatedObject.prototype.createController = function() {
	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';

	// controllers are list items and have the class 'touchable' so that
	// they can be sorted by click/touch and drag
	$('#objectsList').append('<li id="' + objectControllerId + '" class="touchable">'+ 
							  this.objectName + 
							'</li>');

	this.objectController = $('#'+ objectControllerId);
}


/* Make object recordable or not by making it draggable (i.e., movable)
 * or not, since we can't record movement unless the object can move
*/
AnimatedObject.prototype.recordable = function(trueOrFalse) {
	this.canvasElement.setDraggable(trueOrFalse);
}


/* Moves an object to a given position (part of the movement object)
 * and redraws the stage. Part of the larger process of playing an 
 * animation.
*/
AnimatedObject.prototype.performMovement = function(movement) {
	this.canvasElement.setX(movement['x']);
	this.canvasElement.setY(movement['y']);
	app.animationArea.stage.draw();
}


/* Stores a movement object in the object's time -> position map.*/
AnimatedObject.prototype.recordMovement = function(movement) {
	var movementTimeKey = movement['time'];
	this.animation[movementTimeKey] = movement;
}