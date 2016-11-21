var fs = require('fs');
var Utils = require('./utils/Utils');
var PartitionProblem = require('./problems/PartitionProblem');
var BestImprovment = require('./local-search-strategies/BestImprovment');
var SimulatedAnnealing = require('./metaheuristics/SimulatedAnnealing');
var GRASP = require('./metaheuristics/GRASP');
var GreedySelector = require('./metaheuristics/GreedySelector');
var RandomSelector = require('./metaheuristics/RandomSelector');


//var contents = fs.readFileSync('/Users/gleissonassis/Documents/Mestrado/HelloWorldC/HelloWorldC/Particao-100-2-120.txt').toString();
var contents = fs.readFileSync('/Users/gleissonassis/Documents/Mestrado/HelloWorldC/HelloWorldC/Particao-200-4-150.txt').toString();

var bestImprovment = new BestImprovment();
var sa = new SimulatedAnnealing();
var grasp = new GRASP();

var problem = new PartitionProblem();
problem.parseTestProblem(contents);
//problem.setProblemInstance([1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
//console.log(problem.getProblemInstance());

var gs = new RandomSelector(problem);
var s = problem.generateSolution(gs);
console.log(problem.evaluateSolution(s));


console.time('best improvment');
var bestSolution = bestImprovment.run(problem, s);
console.log(problem.evaluateSolution(bestSolution));
console.timeEnd('best improvment');

console.time('sa');
var sa_solution = sa.run(problem, s, 0.001, 10000, 10);
console.log(problem.evaluateSolution(sa_solution));
console.timeEnd('sa');

console.time('grasp');
var grasp_solution = grasp.run(problem, s, 0.3, 100);
console.log(problem.evaluateSolution(grasp_solution));
console.timeEnd('grasp');
