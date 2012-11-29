/* Application Class  
 * ============================================================================
*/

/* Constructor:
 * Sets variables for the app object and initializes sub-objects
*/
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

	// initialize the animationArea
	var animationArea = new AnimationArea();
	this.animationArea = animationArea;
}


/* Initialize necessary elements (mostly UI buttons) so that the user
 * can interact with the app.
*/
App.prototype.init = function() {
	/* initialize the record button*/
	this.recordButton = $('#record');
	this.playButton = $('#play');

	this.setupRecording();
	
	/* make objects list sortable to change the 
	 * zindex of animatedObjects
	*/
    $("ul.sortable-list").sortable({
    	update: function(event) {
    		app.animationArea.updateZPositions();
    	}
    });

	/* initialize the addObject button so that when it's clicked
	 * it reveals the addObject modal window */
	var addAnimatedObjectButton = $('#addObject');
	addAnimatedObjectButton.bind('click', function(e){
		e.preventDefault();
		$('#addObjectModal').reveal();
	});

	/* Setup new object form (contained in a modal) */
	this.setupNewObjectForm();

	// Wire up the play button
	$('#play').bind('click', function() {
		app.playButtonHandler();
	});
}

/* Links up the record button with the application (the timer in particular)
 * so when the user clicks they can start or stop recording.
*/
App.prototype.setupRecording = function() {
	this.recordButton.bind('click', function() {
		var self = $(app.recordButton);
		/* if time is rolling, then clicking this button means
 		 * that the user wants to stop recording
 		*/
		if (app.timeRolling()) {
			// stop the timer
			app.timer.stop();
			// save the currentTime as the end time of the animation
			app.endTime = app.currentTime;
			// reset the timer (so that when we play or record again 
 		    // it starts from the beginning)
			app.timer._ticks = 0;
			// change the button back into being a 'Record' button
			self.html("Record")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
			// enable the play button (it's OK to play now that we're
 		    //  not recording)
			app.playButton.attr("disabled", false);
		}
		/* time isn't rolling, so the user is pressing this button to 
		 * start recording
		*/
		else {
			// disable the play button (can't play while recording)
			app.playButton.attr("disabled", true);
			// start the timer to start recording
			app.timer.start();
			// change the button into a stop button
			self.html("Stop")
				.toggleClass('stoppedButton')
				.toggleClass('recordingButton');
		}
	}); 
};


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
			var currentTime = $('#currentTime')[0];
			if (time % 10 === 0) {
				// if recording
				if (app.isPlaying === false) {
					currentTime.innerHTML = 'Recording. Time is: ' + time;
				}
				else {
					currentTime.innerHTML = 'Playing...';
				}
			}

			// if the animation is playing back and goes past the end time, then 
			// it should stop
			if (app.isPlaying === true) {
				if (time > app.endTime) {
					app.stopPlaying();
					// update message
					currentTime.innerHTML = "The animation is done playing. \
											Press the play button to see the animation again \
											or press the record button to edit or extend it.";
				}
			}
		}
	});
}

/* Handles 'submission' of the new Object form, creating a new
 * animated object using the given name and url
 */
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

/* Helper function, mostly to make checks for whether app
 * is recording a little cleaner and more readable */
App.prototype.timeRolling = function() {
	return app.timer.running();
};


/* Handles clicks on the play/stop button. */
App.prototype.playButtonHandler = function() {
	// if the app is not currently playing
	if (app.timeRolling() === false) {
		app.isPlaying = true;
		// start the timer
		app.timer.start();
		// disable recording for all animated objects
		app.animationArea.recordable(false);
		// disable the record button
		app.recordButton.attr("disabled", true);
		// change the text on the play button to be "stop"
		app.playButton[0].innerHTML = 'Stop';
	}
	/* if time is rolling and a user presses the "Stop" button */
	else if (app.timeRolling() === true) {
		app.stopPlaying();
	}
}


/* Handles user clicks on the "stop" half of the "play" button
 * Note:
 * - might be able to generalize this to handle stopRecording as well
 */
App.prototype.stopPlaying = function(){
	app.isPlaying = false;
	// stop timeRolling
	app.timer.stop();
	app.timer._ticks = 0; // reset to start
	app.recordButton.attr("disabled", false);
	// change the stop button back into the play button
	app.playButton[0].innerHTML = 'Play';
	// enable recording for all animated objects
	app.animationArea.recordable(true);
}


/* TESTING FUNCTION 
 * Initializes the app with three iamges for testing purposes
 */
App.prototype.addAnimatedObjects = function() {
	var objects = [
		{'name': "StickMan", 'file': "animated-images/stick-figure.jpg"},
		{'name': "Tardis", 'file': "animated-images/tardis.png"}
	];
	// create a new animatedObject for each of the above objects
	var i;
	for (i=0; i < objects.length; i++) {
		var animatedObj = new AnimatedObject(objects[i]['name'], objects[i]['file']);
		this.animationArea.addAnimatedObject(animatedObj);
	}
}



