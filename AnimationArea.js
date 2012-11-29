/* AnimationArea Class
==========================================================================
Main role is to perform bulk operations on all animated objects.
*/

/* Constructor */
function AnimationArea() {
	// hold onto animated objects
	this.animatedObjects = [];
	this.areaElement = $('#animationArea');
	this.stage = null;
	this.init();
};


/* Setup a new Kinetic.js Stage (which can contain multiple HTML5 canvases) 
*/
AnimationArea.prototype.init = function() {
	this.stage = new Kinetic.Stage({
		container: 'animationArea',
		height: this.areaElement.height(),
		width: this.areaElement.width()
	})
};


// Add an animatedObject
AnimationArea.prototype.addAnimatedObject = function(animatedObject) {
	this.animatedObjects.push(animatedObject);
};


/* Enables or disables recording of motion for all animatedObjects
 * 
 * Parameters:
 * allowRecording: boolean
*/
AnimationArea.prototype.recordable = function(allowRecording) {
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i];
		animatedObject.recordable(allowRecording);
	}
};

/* Record position of all objects at the beginning of an animation */
AnimationArea.prototype.recordStartPositions = function () {
	var i;
	for (i=0; i < this.animatedObjects.length; i++) {
		var animatedObject = this.animatedObjects[i]
		var canvasElement = animatedObject.canvasElement;
		var movement = {
			time : 10,
			x : canvasElement.getX(),
			y : canvasElement.getY()
		}
		animatedObject.recordMovement(movement);
	}
};

/* Moves all objects to the location at which they were recorded
 * at the given time.
 *
 * Parameters:
 * time: integer, acts as a key to each animatedObject's map of times
 *       to positions
*/
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


/* Updates the layering/z indices of each animatedObject when the user
 * drags to reorder them in the list of object controllers 
*/
AnimationArea.prototype.updateZPositions = function() {
	var controllersList = $('#objectsList');
	var objectControllers = controllersList.children();
	var i;
	for (i = 0; i < objectControllers.length; i++) {
		// objectName is the text in the objectController list item
		var objectName = objectControllers[i].innerHTML;
		// layers are named for the object they hold
		var layerName ='.'+objectName+'Layer';
		var objectLayer = this.stage.get(layerName)[0];
		objectLayer.moveToBottom();
	}
}


/* Search for one object in this area by name */
AnimationArea.prototype.findAnimatedObject = function(name) {
	var searchSpace = this.animatedObjects;
    return $.grep(searchSpace, function(obj){
      return obj.objectName === name;
    });
};