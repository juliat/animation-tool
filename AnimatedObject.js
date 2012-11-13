/* Animated Object Class */

/* create a new animated object */
function AnimatedObject(name, imageFile) {
	this.objectName = name;
	// these are hardcoded defaults for now
	this.sprites = [];
	this.sprites.push(imageFile);
	this.startMoveTime = 0;
	this.animationStates = [];
}

AnimatedObject.prototype.addFile =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function(params) {

}

AnimatedObject.prototype.recordAnimation = function(params) {

}