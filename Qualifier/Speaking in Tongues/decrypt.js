var mapping = 
{
  a: 'y'
, b: 'h'
, c: 'e'
, d: 's'
, e: 'o'
, f: 'c'
, g: 'v'
, h: 'x'
, i: 'd'
, j: 'u'
, k: 'i'
, l: 'g'
, m: 'l'
, n: 'b'
, o: 'k'
, p: 'r'
, q: 'z'
, r: 't'
, s: 'n'
, t: 'w'
, u: 'j'
, v: 'p'
, w: 'f'
, x: 'm'
, y: 'a'
, z: 'q'
}
;

onmessage = function (event) {
  var line = event.data.line
  ,   words = line.split(' ')
  ,   english = []
  ;
  
  for(var i = 0; i < words.length; i++) {
    var word = words[i]
    ,   len = word.length - 1
    ,   start = -1
    ;
    
    while(start++ < len) {          
      english[english.length] = mapping[word[start]];
    }
    
    
    if (i != words.length - 1) {
      english[english.length] = ' ';
    }
  } 
  
  postMessage(english.join(''));
}