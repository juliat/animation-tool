window.onload = function() {
	// create a new instance of App
};

/* Application Class 
initializes javascript that hooks into controls and the animation screen
binds control buttons
 */
function App() {
	// set attributes for the state of the app
	this.recording = false;
	this.playing = false;

	// initialize the Timeline object
	var timelineElement = document.getElementById("timeline");
	this.timeline = new Timeline(timelineElement);

	// initialize the animationArea
	var animationAreaElement = document.getElementById("animationArea");
	this.animationArea = new AnimationArea(animationAreaElement);

	// initialize record, play buttons
	var recordButtonElement = document.getElementById('recordButton');
	this.recordbutton = new Button(recordButtonElement);

	// set up animatedObject control panel
}

App.prototype.record = function(params) {
	// figure out which element is selected
	// tell it to record its position every 1/24 of a second
	// activate the timeline
}

App.prototype.play = function(params) {
	// command all objects to animate themselves, make sure time offsets work
}



