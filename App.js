/* code to run when the window loads to get the 
 * ball rolling
*/
window.onload = function() {
	// create a new instance of App
	app = new App();
	app.init();

	// create some animated objects to get started
	app.addAnimatedObjects();

	// adapt to the user's screen size
	$('#objectControls').css(
	{
		'height': $(window).height()
	});
};

/* Application Class  */
function App() {
	var app = this;

	this.frameRate = 24;
	this.frameInterval = 1000/this.frameRate;
	this.endTime = 0; // by default, the endtime of the animation is time = 0
	this.isPlaying = false; 

	// timerResolution controls how often the position of animated objects
	// will be sampled
	var timerResolution = this.frameInterval + ' milliseconds';
	this.timer = new Timer(timerResolution);
	this.setupTimer();

	// initialize the Timeline object
	this.timeline = new Timeline();

	// initialize the animationArea
	var animationArea = new AnimationArea();
	this.animationArea = animationArea;
}

App.prototype.init = function() {
	/* initialize the record button and bind it to record 
	 * and click in response to user input 
	*/
	this.recordButton = $('#record');
	this.playButton = $('#play');
	
	this.recordButton.bind('click', function() {
		var self = $(app.recordButton);

		if (app.timeRolling()) {
			app.timer.stop();
			app.endTime = app.currentTime;
			app.timer._ticks = 0;
			self.html("Record")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
			app.playButton.attr("disabled", false);
		}

		else {
			app.playButton.attr("disabled", true);
			app.timer.start();
			self.html("Stop")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
		}
	}); // close bind


	/* make objects list sortable to change the 
	 * zindex of animatedObjects
	*/
    $("ul.sortable-list").sortable({
    	update: function(event) {
    		app.animationArea.updateZPositions();
    	}
    });

	/* initialize the addObject button */
	var addAnimatedObjectButton = $('#addObject');
	addAnimatedObjectButton.bind('click', function(e){
		e.preventDefault();
		$('#addObjectModal').reveal();
	});

	/* Setup new object form */
	this.setupNewObjectForm();

	/* bind the play button to the handler function */
	$('#play').bind('click', function() {
		app.playButtonHandler();
	});
}


/* Binds the app timer to play the animation when the timer is running */
App.prototype.setupTimer = function() {
	// every n millisectonds
	this.timer.every(this.frameInterval + ' milliseconds', function() {
		// if the timer is running
		if (app.timeRolling()) {

			var time = app.timer._ticks;
			app.currentTime = time;

			// move the objects to where they are supposed to be at this time
			app.animationArea.moveObjects(time); 

			// and periodically update the time on the UI
			if (time % 10 === 0) {
				$('#currentTime')[0].innerHTML = 'Recording. Time is: ' + time;
			}

			// if the animation is playing back and goes past the end time, then 
			// it should stop
			if (app.isPlaying === true) {
				if (time > app.endTime) {
					app.stopPlaying();
				}
			}
		}
	});
}

App.prototype.setupNewObjectForm = function() {
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
};

App.prototype.timeRolling = function() {
	return app.timer.running();
};

App.prototype.playButtonHandler = function() {
	/* if the app is not currently playing,
	 *  - start the timer, disable recording for all animated objects
	 *  - disable the record button
	 *  - and change the text on the play button to be "stop"
	*/
	if (app.timeRolling() === false) {
		app.isPlaying = true;
		app.timer.start();
		app.animationArea.recordable(false);
		app.recordButton.attr("disabled", true);
		app.playButton[0].innerHTML = 'Stop';
	}
	/* if time is rolling and a user presses the "Stop" button (which doubles
	 * as the play button), then stop time, reset the timer, enable the record button,
	 * change the stop button back into the play button, and enable recording for
	 * all animated objects
	*/
	else if (app.timeRolling() === true) {
		app.stopPlaying();
	}
}

App.prototype.stopPlaying = function(){
	app.timer.stop();
	app.timer._ticks = 0; // reset to start
	app.recordButton.attr("disabled", false);
	app.playButton[0].innerHTML = 'Play';
	app.animationArea.recordable(true);
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



