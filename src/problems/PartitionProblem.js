var Utils = require('../utils/Utils');
var AbstractProblem = require('./AbstractProblem');

function PartitionProblem() {
  AbstractProblem.call(this);
}

PartitionProblem.prototype = Object.create(AbstractProblem.prototype);

PartitionProblem.prototype.parseTestProblem = function(content) {
  var lines = content.split("\n");
  var numbers = [];

  //information about the problem starts at 7th line
  for(var i = 6; i < lines.length; i++) {
    numbers.push(parseInt(lines[i], 10));
  }

  this.setProblemInstance(numbers);
};

PartitionProblem.prototype.evaluateSolution = function(solution) {
  var partitionWeight = [0, 0];

  for(var i = 0; i < solution.length; i++) {
    if(solution[i] != undefined) {
      partitionWeight[solution[i]] += this.problemInstance[i];
    }
  }

  return Math.abs(partitionWeight[0] - partitionWeight[1]);
};

AbstractProblem.prototype.setProblemInstance = function(problemInstance) {
  this.problemInstance = problemInstance;

  this.problemInstance.sort(Utils.compareNumbers);
  this.problemInstance.reverse();
};

PartitionProblem.prototype.disturbSolution = function(solution, level) {
  var newSolution = solution.slice(0);

  if(!level) {
    level = this.randomizer.getRandomIntInclusive(0, 1);
  }

  switch (level) {
    case 0:
      var i = this.randomizer.getRandomInt(0, solution.length);

      newSolution[i] = newSolution[i] == 0 ? 1 : 0;
      return newSolution;
      break;
    case 1:
      var i = this.randomizer.getRandomInt(0, solution.length);
      var j = this.randomizer.getRandomInt(0, solution.length);

      var tmp = newSolution[i];
      newSolution[i] = newSolution[j];
      newSolution[j] = tmp;

      return newSolution;
    default:
      return newSolution;
  }
};

PartitionProblem.prototype.generateNeighborhood = function(solution) {
  var neighborhood = [];

  //generating neighboorhood to the 1st movement
  for(var i = 0; i < solution.length; i++) {
    var newSolution = solution.slice(0);
    newSolution[i] = newSolution[i] == 0 ? 1 : 0;

    neighborhood.push(newSolution);
  }

  //generating neighboorhood to the 2nd movement
  for(var i = 0; i < solution.length; i++) {
    for(var j = i + 1; j < solution.length; j++) {
      var newSolution = solution.slice(0);
      var tmp = newSolution[i];
      newSolution[i] = newSolution[j];
      newSolution[j] = tmp;

      neighborhood.push(newSolution);
    }
  }

  return neighborhood;
},

/**
 * The generateSolution returns a feasible solution for the
 * Partition Problem.
 */
PartitionProblem.prototype.generateSolution = function(selector) {
  var solution = [];

  //placing the first number at the fisrt partition to start a solution
  solution[0] = 0;

  for(var i = 1; i < this.problemInstance.length; i++) {
    solution.push(undefined);
  }

  while(solution.filter((item) => item === undefined).length > 0) {
    var partialSolutions = [];

    for(var i = 1; i < solution.length; i++) {
      if(solution[i] === undefined) {
        var partialSolution0 = solution.slice(0);
        var partialSolution1 = solution.slice(0);

        partialSolution0[i] = 0;
        partialSolution1[i] = 1;

        partialSolutions.push(partialSolution0);
        partialSolutions.push(partialSolution1);
      }
    }

    solution = selector.selectSolution(partialSolutions);
  }

  return solution;
}

/**
 * The generateSolution returns a feasible solution for the
 * Partition Problem.
 */
PartitionProblem.prototype.generateRandomSolution = function() {
  var solution = [];

  for(var i = 0; i < this.problemInstance.length; i++) {
    solution[i] = this.getRandom() <= 0.5 ? 0: 1;
  }

  return solution;
}

module.exports = PartitionProblem;
