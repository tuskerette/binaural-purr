var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// UI buttons selectors
var start = document.querySelector('.start');
var stop = document.querySelector('.stop');

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
oscillator.frequency.setValueAtTime(432, audioCtx.currentTime); // value in hertz

// Splitter
var splitter = audioCtx.createChannelSplitter(2);
oscillator.connect(splitter);
var merger = audioCtx.createChannelMerger(2);

// Reduce the volume of the left channel only
// var gainNode = audioCtx.createGain();
oscillatorGainNode.gain.setValueAtTime(5, audioCtx.currentTime);
// oscillator.frequency.setValueAtTime(20, audioCtx.currentTime);
splitter.connect(oscillatorGainNode, 0);


// Connect the splitter back to the second input of the merger: we
 // effectively swap the channels, here, reversing the stereo image.
oscillatorGainNode.connect(merger, 0, 1);
// oscillator.connect(merger, 0, 1);
splitter.connect(merger, 1, 0);
var dest = audioCtx.createMediaStreamDestination();
merger.connect(audioCtx.destination);



start.onclick = function() {
	oscillator.start(audioCtx.currentTime);
	console.log('started');
	oscillatorGainNode.gain.value = 1;
	oscillatorGainNode.connect(audioCtx.destination);
	// oscillator.connect(audioCtx.destination);
	// rainGain.gain.value = 1;
}

stop.onclick = function() {
	console.log('stopped');
	oscillator.stop(audioCtx.currentTime);
	oscillatorGainNode.gain.value = 0;
	oscillatorGainNode.disconnect(audioCtx.destination);
	// oscillator.disconnect(audioCtx.destination);
	// rainGain.gain.value = 0;
}


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



