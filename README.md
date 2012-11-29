animation-tool
==============

# Description
This is a tool to create short HTML5/Javascript animations, based on the animation app demoed in Bret Victor's Animation App Demoed in the Talk Inventing on Principle. 

Though my app won’t be identical and will be ported to the web/a mouse/keyboard input device, I am trying to port a limited version of this app to the web.

To use my app, a person submits links to the images (.pngs and .jpegs) that they want to animate. Once the images are loaded, a user can select them to animate. Users can record an animation of the motion of that object by gesturing with the mouse. If theyhit record again, the user can go back and select another image to animate, and have the other animations run simultaneously.

# Further development would include
- Having a way to hide and reveal objects, and a better way of handling the 'offstage' area
- Interactive timeline to scrub through the animation
- Support creation and animation of text (kinetic typography!)
- Keyboard shortcuts to select objects to animate and move back and forth in the timeline.
- Allowing for sprites to be changed during the animation.
- Adding rotation modifier so rotation of an object can be animated as well.
- Adding scale modifier.
- Export to video.
- Change the sensitivity of objects to mouse motion or adjust the amount of “smoothing” done by the program
- Having multiple layers in the background.
- Ability to add audio/music.
- Create a drawing tool and allow people to animate what they draw.

# Libraries Used
- jQuery
- jQuery UI
- Reveal Modal by Zurb
- Timer.js - https://github.com/fschaefer/Timer.js
- Touch Punch - https://github.com/furf/jquery-ui-touch-punch