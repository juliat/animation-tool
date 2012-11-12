/* AnimationArea Class
contains all of the animated objects
enforces bounds
might be extensible
when things get uploaded, they get added here
*/
function AnimationArea(domElement) {
	// hold onto animated objects
	this.animatedObjects = [];
	this.currentTime = 0;
}
