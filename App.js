window.onload = function() {
	// create a new instance of App
	app = new App();
	// create new object to animate for testing
	app.addAnimatedObjects();
};

/* Application Class 
initializes javascript that hooks into controls and the animation screen
binds control buttons
 */
function App() {
	var app = this;

	this.frameRate = 24;
	this.frameInterval = 1000/this.frameRate;

	this.endTime = 0;

	var timerResolution = this.frameInterval + ' milliseconds';
	this.timer = new Timer(timerResolution);
	this.timer.every(this.frameInterval + ' milliseconds', function() {
		if (app.timer.running) {
			app.currentTime = app.timer._ticks;
			var time = app.currentTime;
			animationArea.moveObjects(app.currentTime); // just added
			if ((time > app.endTime) && (time % 10 === 0)) {
				//app.timeline.createThumbnail();
				$('#frames').append((app.endTime % 10) + time + ' | ');
			}
		}
	});


	// initialize the Timeline object
	this.timeline = new Timeline();

	// initialize the animationArea
	var animationArea = new AnimationArea();
	this.animationArea = animationArea;

	// initialize record, play buttons
	var recordButtonElement = $('#record');
	/*
	recordButtonElement.on("tap", function(){
		// app.timeline.createThumbnail
		
	});
	*/
	
	var app = this;
	// temporary binding for debugging
	recordButtonElement.bind('click', function() {
		var self = $(recordButtonElement);

		if (app.timer.running()) {
			app.timer.stop();
			app.endTime = app.timer._ticks;
			app.timer._ticks = 0; // reset to start
			self.html("Start").toggleClass('stoppedButton').toggleClass('recordingButton');
		}
		else {
			app.timer.start();
			self.html("Stop").toggleClass('stoppedButton').toggleClass('recordingButton');
		}
	}); // close bind


	this.objectsListControl = $("#objectsList");

	// initialize add object button
	var addAnimatedObjectButton = $('#addObject');
	addAnimatedObjectButton.bind('click', function(e){
		e.preventDefault();
		$('#addObjectModal').reveal();
	});
}

App.prototype.record = function(params) {
	// figure out which element is selected
	// tell it to record its position every 1/24 of a second
	// activate the timeline
}

App.prototype.play = function(params) {
	// command all objects to animate themselves, make sure time offsets work
}

// upload a new image to animate
App.prototype.addAnimatedObjects = function() {
	var objects = [
		{'name': "StickMan", 'file': "animated-images/stick-figure.jpg"},
		{'name': "Tardis", 'file': "animated-images/tardis.png"}
	];
	var i;
	for (i=0; i < objects.length; i++) {
		var animatedObj = new AnimatedObject(objects[i]['name'], objects[i]['file']);
		this.animationArea.addAnimatedObject(animatedObj);
	}
}



