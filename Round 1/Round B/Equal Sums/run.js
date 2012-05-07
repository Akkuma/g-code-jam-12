function init(input) {
  var lines = input.split('\n')
  ,   cases = lines[0] * 1
  ,   caseNum = 1
  ,   results = [] 
  ,   completed = 0
  ;
  
  for (var line = 1; line < lines.length - 1; line++) {
    var levels = lines[line] * 1  
    ,   levelRequirements = []
    ;
    
    for (var level = 1; level < levels + 1; level++) {
      var reqs = lines[line+level].split(' ')
      levelRequirements.push({'1':reqs[0],'2':reqs[1]});
    }
    
    line += levels;
    (function (levelRequirements, caseNum) {    
      results[caseNum] = worker({level:levelRequirements});
			completed++;

			if (completed == cases) {
				output();
			}
  	}(levelRequirements, caseNum));
    
    ++caseNum;
  }

  function output() {
  	var pre = '<pre>';
  	for (var i = 1; i < results.length; i++) {
  	    pre += 'Case #' + i + ': ' + results[i] + '\n';
  	}
  	document.body.innerHTML = pre + '</pre>';
 }
}

function worker(data) {
  var levelReqs = data.level
  ,   levels = levelReqs.length
  ,   oneStarReqs = []
  ,   twoStarReqs = []
  ,   playthroughs = 0
  ,   totalStars = 0
  ,   reqStars = levels * 2
  ;
  
  for (var level = 0; level < levels; ++level) {
    var reqs = levelReqs[level]
    oneStarReqs.push({level: level, req: reqs['1']*1});
    twoStarReqs.push({level: level, req: reqs['2']*1, value: 2});
  }
  
  var sort = function (a, b) { return a.req > b.req; };
  oneStarReqs = oneStarReqs.sort(sort);
  twoStarReqs = twoStarReqs.sort(sort);
  levels === 0 && alert('wtf');
  var minOneStarReq = oneStarReqs[0].req
  ,   minTwoStarReq = twoStarReqs[0].req
  ;
  
  if (minOneStarReq > 0 && minTwoStarReq > 0) {
    return 'Too Bad';
  }
    
  var oneStarPos = 0
  ,   twoStarPos = 0
  ;
  
  while(twoStarPos < levels) {
    var currentLowestTwoStar = twoStarReqs[twoStarPos]
    ,   currentLowestOneStar = oneStarReqs[oneStarPos]
    ;    
    
    if (totalStars >= currentLowestTwoStar.req) {
      ++twoStarPos;
      totalStars += currentLowestTwoStar.value;
    }
    else if (currentLowestOneStar && totalStars >= currentLowestOneStar.req) {
      ++oneStarPos;
      for (var i = 0; i < levels; ++i) {
        if (twoStarReqs[i].level == currentLowestOneStar.level) {
          --twoStarReqs[i].value;
          break;
        }
      }
      ++totalStars;
    }
    else {
      return 'Too Bad';
    }
    
    ++playthroughs;
  }
  
  return playthroughs;
}