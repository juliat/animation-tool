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
	debugger;
	html2canvas = new html2canvas();
	elementToRender = [document.getElementById('animationArea')];
	options = {
		'elements': elementToRender,
		'supportCORS': true
	};
	html2canvas.preload(options);
	html2canvas.render
}