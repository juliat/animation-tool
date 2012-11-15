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
	this.imageElement = $('#' + name);
}

AnimatedObject.prototype.addToAnimatedArea = function() {
	areaElement = $("#animationArea");
	areaElement.append('<img alt="' + this.objectName + 
						'" id="' + 	this.objectName + 
						'" class="draggable" ' + 
						'" src="' + this.sprites[0] + 
						'" />');

	var animatedObject = this;
	// make draggable
	$('#'+this.objectName).draggable({
		startMoveTime: 0,
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
		}
	});
}

AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function() {
	var numMovements = this.animation.length;
	var timeout = 1;
	for (i=0; i < numMovements; i++) {

	}
}

AnimatedObject.prototype.performMovement = function(movement) {
	this.imageElement.left = movement['left'];
	this.imageElement.top = movement['top'];
}

AnimatedObject.prototype.recordMovement = function(movement) {
	this.animation.push(movement);
	console.log(this.animation);
}