function init(input) {
  var lines = input.split('\n')
  ,   cases = lines[0] * 1
  ,   results = [] 
  ,   completed = 0
  ;
  

  for (var line = 1; line <= cases; line++) {
    var inputs = lines[line].split(' ')  
    ;
    (function (line, inputs) {
      var work = new Worker('recycle.js');
      
  		work.onmessage = function (event) {
        results[line] = event.data;
  			completed++;
        work.terminate();
			  console.log(line + ' ' +inputs[0] + ' ' + inputs[1]);
  			if (completed == cases) {
  				output();
  			}
  		};
      
	    work.postMessage({'a':inputs[0],'b':inputs[1]});
  	}(line, inputs));

  }

  function output() {
  	var pre = '<pre>';
  	for (var i = 1; i < results.length; i++) {
  	    pre += 'Case #' + i + ': ' + results[i] + '\n';
  	}
  	document.body.innerHTML = pre + '</pre>';
 }
}