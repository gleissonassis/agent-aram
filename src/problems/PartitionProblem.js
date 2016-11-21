var Utils = require('../utils/Utils');
var AbstractProblem = require('./AbstractProblem');

/**
* The ParitionProblem class represents the classic problem: In number
* theory and computer science, the partition problem (or number partitioning)
* is the task of deciding whether a given multiset S of positive integers
* can be partitioned into two subsets S1 and S2 such that the sum of the
* numbers in S1 equals the sum of the numbers in S2. 
*/
function PartitionProblem() {
  AbstractProblem.call(this);
}

PartitionProblem.prototype = Object.create(AbstractProblem.prototype);

/**
* The parseTestProblem method parses a string content represeting a problem.
*
* @param {string} content - A string represeting the problem, usually is
* a content from a test problem file
*/
PartitionProblem.prototype.parseTestProblem = function(content) {
  var lines = content.split("\n");
  var numbers = [];

  //information about the problem starts at 7th line
  for(var i = 6; i < lines.length; i++) {
    numbers.push(parseInt(lines[i], 10));
  }

  this.setProblemInstance(numbers);
};

/**
* The evaluateSolution method evaluates a solution returning its value
*
* @param {Object} solution - A feasible solution to the problem
*/
PartitionProblem.prototype.evaluateSolution = function(solution) {
  var partitionWeight = [0, 0];

  for(var i = 0; i < solution.length; i++) {
    if(solution[i] != undefined) {
      partitionWeight[solution[i]] += this.problemInstance[i];
    }
  }

  return Math.abs(partitionWeight[0] - partitionWeight[1]);
};

/**
* The setProblemInstance method receives a problem instance and perform tasks to
* trasnform in a valid instance
*
* @param {object} problemInstance - A problem instance
*/
PartitionProblem.prototype.setProblemInstance = function(problemInstance) {
  this.problemInstance = problemInstance;

  this.problemInstance.sort(Utils.compareNumbers);
  this.problemInstance.reverse();
};

/**
* The distubSolution method perform a disturbance on a solution given a
* level. For this implementation the leval equals to 1 will realocate a numbers
* to another partition and the level equals to 2 will swap 2 random numbers
* beetwen the partitions
*
* @param {object} solution - A feasible solution to be disturbed
* @param {int} level - The level applied to the disturbance
*/
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

/**
* The generateNeighborhood method generates all the neighborhood to a given
* solution. For this implementation the following movments will be used to
* generate neighbor solutions:
*
* 1st movment: realocate a number to another partition
* 2nd moviment: swap two numbers beetwen its partitions
*
* @param {object} solution - A feasible solution
*/
PartitionProblem.prototype.generateNeighborhood = function(solution) {
  var neighborhood = [];

  //generating neighborhood to the 1st movement
  for(var i = 0; i < solution.length; i++) {
    var newSolution = solution.slice(0);
    newSolution[i] = newSolution[i] == 0 ? 1 : 0;

    neighborhood.push(newSolution);
  }

  //generating neighborhood to the 2nd movement
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
 * The generateSolution method returns a feasible solution based on a given
 * selector
 *
 * @param {Selector} selector - A valid selector (GreedySelector,
 * RandomSelector, GRASPSelector)
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
 * The generateRandomSolution method returns a random feasible solution for the
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
