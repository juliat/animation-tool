/* Timeline class */
function Timeline() {
	this.timelineElement = $("#timeline");
}

Timeline.prototype.getCurrentTime = function() {

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
	var timeline = this;
	var config = {
		callback: function(result) {
			timeline.addThumbnailToTimeline(result);
		},
		mimeType: 'image/jpeg',
		quality: 0.1
	};
	app.animationArea.stage.toImage(config);
}

Timeline.prototype.addThumbnailToTimeline = function(thumbnail) {
	this.framesList.append(thumbnail);
	thumbnail.style.height = '4em';
}