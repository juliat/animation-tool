window.onload = function() {
	function init(){
		canvas = document.getElementById("myCanvas");
		context = canvas.getContext("2d");
		// add event listener to the canvas for mouse moves 
		canvas.addEventListener('mousemove', mousemove_event, false);
    }
	
	function mousemove_event(event) {
		var x, y;

		// Get the mouse position relative to the canvas element.
		if (event.layerX || event.layerX == 0) { 
		  x = event.layerX;
		  y = event.layerY;
		} 

		console.log(x,y);
	}
	
	// run code
	init();
};