/* AnimationArea Class
contains all of the animated objects
enforces bounds
might be extensible
when things get uploaded, they get added here
*/
function AnimationArea() {
	// hold onto animated objects
	this.animatedObjects = [];
	this.currentTime = 0;

	this.areaElement = $('#animationArea');
	this.stage = null;
	this.init();
};

AnimationArea.prototype.init = function() {
	this.stage = new Kinetic.Stage({
		container: 'animationArea',
		height: this.areaElement.height(),
		width: this.areaElement.width()
	})
};

AnimationArea.prototype.addAnimatedObject = function(animatedObject) {
	var number = this.animatedObjects.length;
	// assign number to animated object
	animatedObject.number = number;
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
};

AnimationArea.prototype.moveObjects = function(time) {
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i];
		var movement = animatedObject.animation[time];
		if (movement !== undefined) {
			animatedObject.performMovement(movement);
		}
	}	
}

AnimationArea.prototype.updateZPositions = function() {
	var controllersList = $('#objectsList');
	var objectControllers = controllersList.children();
	var i;
	var lastIndex = objectControllers.length -1;
	for (i= lastIndex; i >= 0; i--) {
		var objectName = objectControllers[i].innerHTML;
		//var object = this.findAnimatedObject(objectName);
		var objectLayer = this.stage.get('.'+objectName+'Layer')[0].moveToTop();
	}
}


/* search for one object in this area by name */
AnimationArea.prototype.findAnimatedObject = function(name) {
	var searchSpace = this.animatedObjects;
    return $.grep(searchSpace, function(obj){
      return obj.objectName === name;
    });
};

AnimationArea.prototype.mapToAllAnimations = function(functionToMap) {

};