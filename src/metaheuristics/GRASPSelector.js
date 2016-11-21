function GRASPSelector(problem) {
  return {
    alpha : 0,
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

      var limitValue = parsedSolutions[0].value
        + (parsedSolutions[0].value * this.alpha);

      var restrictedList = parsedSolutions.filter((item) => {
        return item.value <= limitValue;
      });

      var randomSolution = problem.getRandomizer()
                          .getRandomInt(0, restrictedList.length);

      return restrictedList[randomSolution].solution;
    }
  }
}

module.exports = GRASPSelector;
