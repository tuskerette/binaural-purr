var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// UI buttons selectors
var start = document.querySelector('.start');
var stop = document.querySelector('.stop');
// var rangeSlider = document.querySelector('input');


// Rain
var rain = audioCtx.createRain();
var rainGain = audioCtx.createGain();
rainGain.gain.value = 0;
rain.connect(rainGain);
rainGain.connect(audioCtx.destination);

// Oscillator tone
var oscillator = audioCtx.createOscillator();
var oscillatorGainNode = audioCtx.createGain();
oscillator.connect(oscillatorGainNode);
oscillatorGainNode.connect(audioCtx.destination);
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(25, audioCtx.currentTime); // value in hertz


start.onclick = function() {
	oscillator.start(audioCtx.currentTime);
	console.log('started');
	oscillatorGainNode.gain.value = 1;
	// oscillator.connect(audioCtx.destination);
	// rainGain.gain.value = 1;
}

stop.onclick = function() {
	console.log('stopped');
	oscillator.stop(audioCtx.currentTime);
	oscillatorGainNode.gain.value = 0;
	// oscillatorGainNode.disconnect(audioCtx.destination);
	// oscillator.disconnect(audioCtx.destination);
	// rainGain.gain.value = 0;
}


// rangeSlider.oninput = function() {
// }



// Stereo Panner stuff WIP
// var panNode = audioCtx.createStereoPanner();
// var panControl = document.querySelector('.panning-control');
// var panValue = document.querySelector('.panning-value');
// var pre = document.querySelector('pre');
// var source = oscillator;

// pre.innerHTML = document.querySelector('script').innerHTML;

// panControl.oninput = function() {
//   panNode.pan.setValueAtTime(panControl.value, audioCtx.currentTime);
//   panValue.innerHTML = panControl.value;
// }

// source.connect(panNode);
// panNode.connect(audioCtx.destination);





// mute button
// var mute = document.querySelector('.mute');

// mute.onclick = function() {
//   if(mute.getAttribute('data-muted') === 'false') {
//     oscillatorGainNode.disconnect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'true');
//     mute.innerHTML = "Unmute";
//   } else {
//     oscillatorGainNode.connect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'false');
//     mute.innerHTML = "Mute";
//   };
// }


