/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.sprites.push(imageFile);
	this.startMoveTime = 0;
	this.animation = [];
	this.addToAnimatedArea();
	this.imageElement = $('#' + this.objectName);
	this.paused = false; // might delete this


	// create a controller for this animated object	
	var objectControllerId = this.objectName + 'Controller';
	app.objectsListControl.append('<li id="' + objectControllerId + '">'+ this.objectName + '</li>');
	this.objectController = $('#'+ objectControllerId);

	this.objectController.bind('click', function(e) {
		console.log('clicked '+ name +' controller');
	});

}

AnimatedObject.prototype.addToAnimatedArea = function() {
	areaElement = $("#animationArea");
	areaElement.append('<img alt="' + this.objectName + 
						'" id="' + 	this.objectName + 
						'" class="draggable" ' + 
						'" src="' + this.sprites[0] + 
						'" />');

	var animatedObject = this;
	// make draggable within the animation area
	$('#'+this.objectName).draggable({
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
	});
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
	console.log(movement['left'] + ', ' + movement['top']);
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
	console.log(this.animation);
}