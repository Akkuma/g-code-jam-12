function init(input) {
  var lines = input.split('\n')
  ,   cases = lines[0] * 1
  ,   results = [] 
  ,   completed = 0
  ;
  

  for (var line = 1; line <= cases; line++) {
    var inputs = lines[line]
    ;
    (function (line) {
      var work = new Worker('decrypt.js');
      
    	work.onmessage = function (event) {
        results[line] = event.data;
  			completed++;
        work.terminate();

  			if (completed == cases) {
  				output();
  			}
  		};
	    work.postMessage({line:inputs});
  	}(line));

  }

  function output() {
  	var pre = '<pre>';
  	for (var i = 1; i < results.length; i++) {
  	    pre += 'Case #' + i + ': ' + results[i] + '\n';
  	}
  	document.body.innerHTML = pre + '</pre>';
 }
}