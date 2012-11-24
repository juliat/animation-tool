/* Timeline class */
function Timeline() {
	this.timelineElement = document.getElementById("timeline");
	//this.line = document.getElementById();
}

Timeline.prototype.rollTime = function(params) {

}

Timeline.prototype.moveLine = function(params) {

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
	var x = html2canvas.preload(options);
	console.log(x);
	x.render();
}