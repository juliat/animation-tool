/* AnimationArea Class
contains all of the animated objects
enforces bounds
might be extensible
when things get uploaded, they get added here
*/
function AnimationArea() {
	// hold onto animated objects
	this.areaElement = $("#animationArea");
	this.objectsListControl = $("#objectsList");
	this.animatedObjects = [];
	this.currentTime = 0;
}

AnimationArea.prototype.addAnimatedObject = function(animatedObject) {
	this.animatedObjects.push(animatedObject);
	this.objectsListControl.append('<li>'+ animatedObject.objectName + '</li>');
	this.areaElement.append('<img alt="' + animatedObject.objectName + '" id="' + 
		animatedObject.objectName + '" src="' + animatedObject.sprites[0] + '" />');
};