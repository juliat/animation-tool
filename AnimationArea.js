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
	this.animatedObjects.push(animatedObject);
};

/* 
   allowRecording is boolean
*/
AnimationArea.prototype.recordable = function(allowRecording) {
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i];
		animatedObject.recordable(allowRecording);
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
		var layerName ='.'+objectName+'Layer';
		var objectLayer = this.stage.get(layerName)[0];
		objectLayer.moveToTop();
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