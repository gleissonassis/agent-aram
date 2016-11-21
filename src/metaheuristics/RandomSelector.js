function RandomSelector(problem) {
  return {
    selectSolution: function(partialSolutions) {
      return partialSolutions[problem.randomizer.getRandomInt(0, partialSolutions.length)];
    }
  }
}

module.exports = RandomSelector;
