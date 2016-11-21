var seedrandom = require('seedrandom');

function Randomizer(seed) {
  var rng = null;

  if(seed) {
    rng  = seedrandom(seed);
  } else {
    rng = seedrandom();
  }

  return {
    /**
    * The method getRandom returns a random number between 0 (inclusive)
    * and 1 (exclusive)
    *
    * @author https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    getRandom: function(seed) {

      return rng();
    },

    /**
    * The method getRandomArbitrary returns a random number between min (inclusive) and
    * max (exclusive)
    *
    * @param {number} min - The minimum value to the range
    * @param {number} max - The maximum value to the range
    * @author https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    getRandomArbitrary: function(min, max) {
      return rng() * (max - min) + min;
    },

    /**
    * The method getRandomIntInclusive returns a random number between min (inclusive) and
    * max (exclusive)
    *
    * @param {int} min - The minimum integer value to the range
    * @param {int} max - The maximum integer  value to the range
    * @author https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    getRandomIntInclusive: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(rng() * (max - min + 1)) + min;
    },

    /**
    * Returns a random integer between min (included) and max (excluded).
    * Using Math.round() will give you a non-uniform distribution!
    *
    * @param {int} min - The minimum integer value to the range
    * @param {int} max - The maximum integer  value to the range
    * @author https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(rng() * (max - min)) + min;
    },

    /**
    * Returns a random integer between min (included) and max (included).
    * Using Math.round() will give you a non-uniform distribution!
    *
    * @param {int} min - The minimum integer value to the range
    * @param {int} max - The maximum integer  value to the range
    * @author https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    getRandomIntInclusive: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(rng() * (max - min + 1)) + min;
    }
  }
}

module.exports = Randomizer;
