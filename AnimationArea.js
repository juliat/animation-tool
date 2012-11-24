/* AnimationArea Class
contains all of the animated objects
enforces bounds
might be extensible
when things get uploaded, they get added here
*/
function AnimationArea() {
	// hold onto animated objects
	this.areaElement = $("#animationArea");
	this.animatedObjects = [];
	this.currentTime = 0;
}

AnimationArea.prototype.addAnimatedObject = function(animatedObject) {
	this.animatedObjects.push(animatedObject);
};

/* iterates over all animated objects in the animation area
   and calls playAnimation on each one
*/
AnimationArea.prototype.playAllAnimations = function() {
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i];
		animatedObject.playAnimation();
	}
}