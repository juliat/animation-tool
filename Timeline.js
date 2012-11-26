/* Timeline class */
function Timeline() {
	this.timelineElement = document.getElementById("timeline");
	this.currentTime = 0;
	//this.line = document.getElementById();
}

Timeline.prototype.setCurrentTime = function() {

}

Timeline.prototype.rollTime = function() {

}

Timeline.prototype.moveLine = function() {

}

// once the user drags and drops the line slider, the
// animation area needs to update to the right time
Timeline.prototype.updateAnimationArea = function(){

}

/* using html2canvas */
Timeline.prototype.createThumbnail = function() {
	var html2obj = html2canvas($('#animationArea'));

	var queue  = html2obj.parse();
	var canvas = html2obj.render(queue);
	var img = canvas.toDataURL();

	window.open(img);
}