var GRASPSelector = require('./GRASPSelector');
var RandomSelector = require('./RandomSelector');
var BestImprovment = require('../local-search-strategies/BestImprovment');

function GRASP() {
  return {
    run: function(problem, initialSolution, alpha, iterations) {
      var graspSelector = new GRASPSelector(problem);
      var bi = new BestImprovment();
      var bestSolution = initialSolution;

      graspSelector.alpha = alpha;

      for(var i = 0; i < iterations; i++) {
        var currentSolution = problem.generateRandomSolution();
        var currentSolution = problem.generateSolution(graspSelector);
        currentSolution = bi.run(problem, currentSolution);

        if(bestSolution === null || (bestSolution !== null
          && problem.compareSolutions(currentSolution, bestSolution))) {
            bestSolution = currentSolution;
        }
      }

      return bestSolution;
    }
  }
}

module.exports = GRASP;
