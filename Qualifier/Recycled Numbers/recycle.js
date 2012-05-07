onmessage = function (event) {
  var a = event.data.a
  ,   b = event.data.b
  ,   n = a * 1
  ,   start = n
  ,   end = b * 1
  ,   len = a.length
  ,   count = 0
  ,   found = {}
  ,   min = Math.pow(10, len - 1)
  ,   max = ''
  ,   lookup = {}
  ;
  
  for (var i = len - 1; i > 0; i--) {
    max += '9';
  }
  
  var digits = 10
  while(digits--) {
    lookup[digits + ''] = 
    {
      max: (digits + max) * 1
    , min: digits * min
    }
    ;
  }
  //max = min/(max * 1);
  
  n--;
  while (n++ < end - 1) {  
    var curLen = len
    ,   nTemp = n + ''
    ;
    
    while (curLen--) {
      var startingNum = nTemp[curLen];
      if (lookup[startingNum].max < start || lookup[startingNum].min > end) { 
        continue; 
      } 
      
      var nRecycled = nTemp.substring(curLen) + nTemp.substring(0, curLen);
      nRecycled *= 1;
      
      if (nRecycled >= start 
        && nRecycled <= end
        && nRecycled > n ) {
        found[n + ' ' + nRecycled] = 1; 
      }
    }
  }
  
  for (var i in found) {
    found.hasOwnProperty(i) && count++;
  }
  
  postMessage(count);
}