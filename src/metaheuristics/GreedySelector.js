function GreedySelector(problem) {
  return {
    selectSolution: function(partialSolutions) {
      var parsedSolutions = [];

      for(var i = 0; i < partialSolutions.length; i++) {
        parsedSolutions.push({
          value: problem.evaluateSolution(partialSolutions[i]),
          solution: partialSolutions[i]
        });
      }

      parsedSolutions.sort(function(a,b) {
        return a.value - b.value;
      });

      return parsedSolutions[0].solution;
    }
  }
}

module.exports = GreedySelector;
