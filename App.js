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
	// set attributes for the state of the app
	this.recording = false;
	this.playing = false;

	this.frameRate = 24;
	this.frameInterval = 1000/this.frameRate;

	var timerResolution = this.frameInterval + ' milliseconds';
	this.timer = new Timer(timerResolution);

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
		// app.timeline.createThumbnail();
		if (app.timer.running()) {
			app.timer.stop();
		}
		else {
			app.timer.start();
			app.timer.bind(this.frameInterval + ' milliseconds', function(){
				app.currentTime = app.timer._ticks;
				console.log(app.currentTime);
			});
		}
	}); // close bind


	var playButtonElement = $('#play');
	/*
	playButtonElement.on('tap', function() {
		app.timer.clear();
		app.timer.start();
		app.timer.bind(this.frameInterval + ' milliseconds', function(){
			app.currentTime = app.timer._ticks;
			animationArea.moveObjects(app.currentTime);
		})	
	});
	*/
	playButtonElement.bind('click', function() {
		app.timer.clear();
		app.timer.start();
		app.timer.bind(this.frameInterval + ' milliseconds', function(){
			app.currentTime = app.timer._ticks;
			animationArea.moveObjects(app.currentTime);
		})	
	});

	// temporary button
	var pauseButtonElement = $('#pause');
	pauseButtonElement.bind('click', function() {
		animationArea.pauseAllAnimations();
	});

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



