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
  var rangeSlider = document.querySelector('input');

  bBeat.connect(gain);
  gain.connect(context.destination);
  leftChannel.connect(analyserLeft);
  rightChannel.connect(analyserRight);

  bBeat.setWaveType(BinauralBeat.SINE);
  bBeat.setPitch(40);
  bBeat.setBeatRate(5);


  start.onclick = function() {
    bBeat.start();
  }

  stop.onclick = function() {
    bBeat.stop();
  }

  rangeSlider.oninput = function(e) {
    var volume;
    volume = Number(e.target.value);
    return gain.gain.value = volume / 100;
  }
})();
