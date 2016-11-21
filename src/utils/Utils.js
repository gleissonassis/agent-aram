module.exports = {
  /**
  * The compareNumbers method returns if a number is less than, greater than or equal
  * other number.
  *
  * @param {int} a - A number
  * @param {int} b - A number
  * @author https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  */
  compareNumbers: function(a, b) {
    return a - b;
  },

  clone: function(src) {
  	function mixin(dest, source, copyFunc) {
  		var name, s, i, empty = {};
  		for(name in source){
  			// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
  			// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
  			// don't overwrite it with the toString() method that source inherited from Object.prototype
  			s = source[name];
  			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
  				dest[name] = copyFunc ? copyFunc(s) : s;
  			}
  		}
  		return dest;
  	}

  	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
  		// null, undefined, any non-object, or function
  		return src;	// anything
  	}
  	if(src.nodeType && "cloneNode" in src){
  		// DOM Node
  		return src.cloneNode(true); // Node
  	}
  	if(src instanceof Date){
  		// Date
  		return new Date(src.getTime());	// Date
  	}
  	if(src instanceof RegExp){
  		// RegExp
  		return new RegExp(src);   // RegExp
  	}
  	var r, i, l;
  	if(src instanceof Array){
  		// array
  		r = [];
  		for(i = 0, l = src.length; i < l; ++i){
  			if(i in src){
  				r.push(this.clone(src[i]));
  			}
  		}
  		// we don't clone functions for performance reasons
  		//		}else if(d.isFunction(src)){
  		//			// function
  		//			r = function(){ return src.apply(this, arguments); };
  	}else{
  		// generic objects
  		r = src.constructor ? new src.constructor() : {};
  	}
  	return mixin(r, src, this.clone);

  }
}
