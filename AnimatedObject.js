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
	// make draggable
	$('#'+this.objectName).draggable({
		start: function(event) {
			console.log('start drag');
			// start counting time
		},
		drag: function(event) {
			console.log(this.style.top + ', ' + this.style.left + ' ' + event.timeStamp);
		}
	});
}

AnimatedObject.prototype.addSprite =  function(params) {
	
}

AnimatedObject.prototype.playAnimation = function(params) {

}

AnimatedObject.prototype.recordAnimation = function() {

}