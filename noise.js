(function(AudioContext) {
  AudioContext.prototype.createMyNoise = function(bufferSize) {
    bufferSize = bufferSize || 4096;
    var lastOut = 0.0;
    var node = this.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
      var output = e.outputBuffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 2;
      }
    }
    return node;
  };
})(window.AudioContext || window.webkitAudioContext);
