/**
* The BestImprovment class calculates the best solution in a given neighborhood.
*
*/
function BestImprovment() {
  return {
    /**
    * The run method returns the best solution in a given neighborhood.
    *
    * @param {Problem} problem - A Problem implementation.
    * @param {Object} solution - A feasible solution for the problem's
    * implementation
    */
    run: function(problem, solution) {
      var bestSolution = solution;

      var neighborhood = problem.generateNeighborhood(solution);

      for(var i = 0; i < neighborhood.length; i++) {
        //checking if the current solution is best than the best solution found
        if(problem.compareSolutions(neighborhood[i], bestSolution) == -1) {
          bestSolution = neighborhood[i];
        }
      }

      return bestSolution;
    }
  }
}

module.exports = BestImprovment;
