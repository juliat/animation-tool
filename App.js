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

	this.timer = new Timer();


	this.frameRate = 24;

	// initialize the Timeline object
	this.timeline = new Timeline();

	// initialize the animationArea
	var animationArea = new AnimationArea();
	this.animationArea = animationArea;

	// initialize record, play buttons
	var recordButtonElement = $('#record');
	recordButtonElement.on("tap", function(){
		// app.timeline.createThumbnail
		
	});

	var app = this;
	// temporary binding for debugging
	recordButtonElement.bind('click', function() {
		//app.timeline.createThumbnail();
		app.timer.start();
		app.timer.bind('1 second', function(){
		console.log(app.timer._ticks);
	})
	})
	// this.recordbutton = new Button(recordButtonElement);

	var playButtonElement = $('#play');
	playButtonElement.on('tap', function() {
		animationArea.playAllAnimations();
	});
	playButtonElement.bind('click', function() {
		animationArea.playAllAnimations();
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



