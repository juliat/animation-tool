/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.number = app.animationArea.animatedObjects.length + 1;
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.sprites.push(imageFile);
	this.animation = [];
	this.objectController = null;
	this.imageFile = imageFile;
	this.addToAnimatedArea();
	this.paused = false; // might delete this
}

AnimatedObject.prototype.addToAnimatedArea = function() {

	var img = new Image();
	img.src =this.imageFile;
	img.onload = function() {
        var kineticImage = new Kinetic.Image({
          x: 0,
          y: 0,
          image: img,
          draggable: true
        });

        var layer = new Kinetic.Layer();

        // add the shape to the layer
        layer.add(kineticImage);

        // add the layer to the stage
        app.animationArea.stage.add(layer);
      };

	this.createController();
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

AnimatedObject.prototype.select = function() {
	// deselect and disable all draggable objects
	$('#objectsList li').removeClass('selected');
	$('.ui-draggable').draggable('disable');
	
	// and only select and enable this one
	this.objectController.addClass('selected');
	this.imageElement.draggable('enable');	
}

AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function() {
	console.log('play');
	this.paused = false;
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
	var imageElement = $('#' + this.objectName);
	imageElement.animate(
		{
		'left': movement['left'],
		'top': movement['top']
		},
		movement['duration']
	);
}

AnimatedObject.prototype.recordMovement = function(movement) {
	this.animation.push(movement);
}