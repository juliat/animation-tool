/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.sprites.push(imageFile);
	this.animation = [];
	this.objectController = null;
	this.imageElement = null;
	this.addToAnimatedArea();
	this.paused = false; // might delete this
}

AnimatedObject.prototype.addToAnimatedArea = function() {
	var areaElement = $("#animationArea");
	areaElement.append('<img alt="' + this.objectName + 
						'" id="' + 	this.objectName + 
						'" class="draggable" ' + 
						'" src="' + this.sprites[0] + 
						'" />');

	this.imageElement = $('#'+this.objectName);

	var animatedObject = this;

	this.imageElement
		// make draggable within the animation area
		.draggable({
			startMoveTime: 0,
			containment: "#animationArea",
			start: function(event) {
				animatedObject.animation = []; // clear out animation list
				startMoveTime = event.timeStamp;
			},
			drag: function(event) {
				var movement = {
					left : this.style.left,
					top : this.style.top,
					deltaTimestamp : event.timeStamp - startMoveTime
				}
				animatedObject.recordMovement(movement);
			},
			end: function(event) {
				animatedObject.totalAnimationDuration = event.timeStamp - startMoveTime;
				console.log(animatedObject.totalAnimationDuration);
			}
		})
		// also bind the select method to the click event for the image
		.bind('click', function(){
			animatedObject.select();
		});

	


	this.createController();
}

AnimatedObject.prototype.createController = function() {
	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';

	// could not use app var here and just go straight to DOM. tradeoffs?
	app.objectsListControl.append('<li id="' + objectControllerId + '">'+ this.objectName + '</li>');
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
	// debugger;
	var numMovements = this.animation.length;
	var timeout = 1;
	var animatedObject = this;
	var i = 1;
	while ((i < numMovements) && (this.paused === false)) {
		var movement = this.animation[i];
		var lastMovement = this.animation[i-1];
		var duration = movement['deltaTimestamp'] - lastMovement['deltaTimestamp'];
		movement['duration'] = duration;
		animatedObject.performMovement(movement);
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