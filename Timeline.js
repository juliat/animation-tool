/* Timeline class 
 * =================================================================
 * Unfinished, and currently not in use.
 * 
 * Would handle the UI for time display and nav, creating thumbnail images
 * of the animation area and allowing the user to move backward and
 * forward freely through the animation.
*/
function Timeline() {
	this.timelineElement = $("#timeline");
}


/* Creates thumbnail snapshots of the animationArea for use in the timeline
 *
 * Note: 
 * Could also use for exporting animation to images, would just have to
 * adjust the quality of the images
*/
Timeline.prototype.createThumbnail = function() {
	var timeline = this;
	var config = {
		// once the thumbails ready, add it to the timeline
		callback: function(result) {
			timeline.addThumbnailToTimeline(result);
		},
		mimeType: 'image/jpeg',
		// just thumbnails, so using lowest quality
		quality: 0.1
	};
	// convert the animationArea stage to an image
	app.animationArea.stage.toImage(config);
}


/* Adds thumbnail images to the timeline */
Timeline.prototype.addThumbnailToTimeline = function(thumbnail) {
	this.framesList.append(thumbnail);
	thumbnail.style.height = '4em';
}


/* Not implemented
 * -----------------------------------------------------------------------------

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
*/