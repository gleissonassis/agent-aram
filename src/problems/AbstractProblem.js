var Randomizer = require('../utils/Randomizer');
var Utils = require('../utils/Utils');

function AbstractProblem() {
  //initializing a randomizer with a static seed
  this.randomizer = new Randomizer(10);

  this.problemInstance = null;
  this.isMax = false;
}

AbstractProblem.prototype.getRandom = function() {
  return this.randomizer.getRandom();
}

AbstractProblem.prototype.getRandomizer = function() {
  return this.randomizer;
}

AbstractProblem.prototype.compareSolutions = function(x, y) {
  var valueX = this.evaluateSolution(x);
  var valueY = this.evaluateSolution(y);

  if(valueX < valueY) {
    return !this.isMax ? -1 : 1;
  } else if(valueX > valueY) {
    return !this.isMax ? 1 : -1;
  } else {
    return 0;
  }
};

AbstractProblem.prototype.getProblemInstance = function() {
  return Utils.clone(this.problemInstance);
};

AbstractProblem.prototype.setProblemInstance = function(problemInstance) {
  this.problemInstance = problemInstance;
};

AbstractProblem.prototype.prototypesetIsMax = function(isMax) {
  this.isMax = isMax;
};

AbstractProblem.prototype.getIsMax = function() {
  return this.isMax;
}

AbstractProblem.prototype.calculateDelta = function(x, y) {
  var r = this.evaluateSolution(x) - this.evaluateSolution(y);
  return this.isMax ? -r : r;
}

module.exports = AbstractProblem;
