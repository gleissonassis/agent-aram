var Utils = require('../utils/Utils');
var RandomSelector = require('./RandomSelector');

function SimulatedAnnealing() {
  return {
    run: function(problem, initialSolution, temperatureDecreasingFactor, initialTemperature, disturbances) {
      var disturbancesCount = 0;
      var temperature = initialTemperature;
      var delta = 0;

      if(!initialSolution) {
        initialSolution = problem.generateSolution(new RandomSelector(problem));
      }

      var bestSolution = Utils.clone(initialSolution);
      var currentSolution = Utils.clone(bestSolution);
      var e = 2.71828;

      while(temperature > 0.0001) {
        while(disturbancesCount < disturbances) {
            disturbancesCount++;

            neighbor = problem.disturbSolution(currentSolution);
            delta = problem.calculateDelta(neighbor, currentSolution);

            if(delta < 0) {
                currentSolution = neighbor;

                //checking if the current solution is best than the best found
                if(problem.compareSolutions(neighbor, bestSolution) == -1) {
                  bestSolution = neighbor;
                }
            } else {
                if(problem.getRandom() < Math.pow(e, -delta / temperature)) {
                  currentSolution = neighbor;
                }
            }
        }

        disturbancesCount = 0;
        temperature -= (temperatureDecreasingFactor * temperature);
      }

      return bestSolution;
    }
  }
}

module.exports = SimulatedAnnealing;
