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