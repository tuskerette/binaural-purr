(function() {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  var bBeat = new BinauralBeat(context);
  var leftChannel = bBeat.getChannel(0);
  var rightChannel = bBeat.getChannel(1);
  var gain = context.createGain();
  var analyserLeft = context.createAnalyser();
  var analyserRight = context.createAnalyser();
  var start = document.querySelector('.start');
  var stop = document.querySelector('.stop');
  var volumeSlider = document.getElementById('sldr-volume');
  var pitchSlider = document.getElementById('sldr-pitch');
  var beatSlider = document.getElementById('sldr-beat');

  bBeat.connect(gain);
  gain.connect(context.destination);
  leftChannel.connect(analyserLeft);
  rightChannel.connect(analyserRight);

  bBeat.setWaveType(BinauralBeat.SINE);
  bBeat.setPitch(40);
  bBeat.setBeatRate(8);


  start.onclick = function() {
    bBeat.start();
  }

  stop.onclick = function() {
    bBeat.stop();
  }

  volumeSlider.oninput = function(e) {
    var volume = Number(e.target.value);
    return gain.gain.value = volume / 100;
  }

  pitchSlider.oninput = function(e) {
    var pitch = Number(e.target.value);
    bBeat.setPitch(pitch);
  }

  beatSlider.oninput = function(e) {
    var beats = Number(e.target.value);
    bBeat.setBeatRate(beats);
  }
})();
