window.onload = function() {
	// create a new instance of App
	app = new App();
	// create new object to animate for testing
	app.addAnimatedObjects();


	$('#objectControls').css(
	{
		'height': $(window).height()
	});
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
	
	recordButtonElement.bind('click', function() {
		var self = $(recordButtonElement);

		if (app.timer.running()) {
			app.timer.stop();
			app.timer._ticks = 0; // reset to start
			app.endTime = app.timer._ticks;
			self.html("Record")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
			$('#play').attr("disabled", false);
		}
		else {
			$('#play').attr("disabled", true);
			app.timer.start();
			self.html("Stop")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
		}
	}); // close bind

	
	$('#play').bind('click', function() {
		app.play();
	});


	this.objectsListControl = $("#objectsList");

	/* make objects list sortable  to change the zindex of animatedObjects*/
    $("ul.sortable-list").sortable({
    	update: function(event) {
    		animationArea.updateZPositions();
    	}
    });

	// initialize add object button
	var addAnimatedObjectButton = $('#addObject');
	addAnimatedObjectButton.bind('click', function(e){
		e.preventDefault();
		$('#addObjectModal').reveal();
	});

	var form = $('#addObjectModal form');
	form.on('submit', function(event) {
		event.preventDefault();
		// console.log('submit');
		$('#addObjectModal').trigger('reveal:close');
		var name = $('#submitObjectName').val();
		var file = $('#submitObjectUrl').val();
		var animatedObj = new AnimatedObject(name, file);
		app.animationArea.addAnimatedObject(animatedObj);
	});
}

App.prototype.play = function() {
	var recordButton = $('#record');
	var playButton = $('#play')[0];
	if (app.timer.running() === false) {
		app.animationArea.recordable(false);
		app.timer.start();
		recordButton.attr("disabled", true);
		playButton.innerHTML = 'Stop';
	}
	else if ((app.timer.running() === true)) {
		app.timer.stop();
		app.timer._ticks = 0; // reset to start
		recordButton.attr("disabled", false);
		playButton.innerHTML = 'Play';
		app.animationArea.recordable(true);
	}
}

// grab a new image to animate
App.prototype.addAnimatedObjects = function() {
	var objects = [
		{'name': "Background", 
		 'file' : "http://greywoolfetarot.files.wordpress.com/2010/04/tardiswallpaperrm4.png"
		},
		{'name': "StickMan", 'file': "animated-images/stick-figure.jpg"},
		{'name': "Tardis", 'file': "animated-images/tardis.png"}
	];
	var i;
	for (i=0; i < objects.length; i++) {
		var animatedObj = new AnimatedObject(objects[i]['name'], objects[i]['file']);
		this.animationArea.addAnimatedObject(animatedObj);
	}
}



