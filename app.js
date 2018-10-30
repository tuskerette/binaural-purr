// var rangeSlider = document.querySelector('input');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var myNoise = audioCtx.createMyNoise();
var myGain = audioCtx.createGain();
myGain.gain.value = 0;
myNoise.connect(myGain);
myGain.connect(audioCtx.destination);

var startSound = function() {
	myGain.gain.value = 1;
}

var stopSound = function() {
	myGain.gain.value = 0;
}

// rangeSlider.oninput = function() {

// }
