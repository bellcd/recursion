// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj, resultObj, counter = 0) {
  // make a copy of obj for each iteration
  if (obj === null) {
    obj = obj;
  } else if (Array.isArray(obj)) {
    obj = obj.slice();
  } else if (typeof obj === 'object') {
    obj = Object.assign({}, obj);
  } else {
    obj = obj;
  }
  // base cases
    // undefined OR function, return undefined
    // number, boolean, string, null, return actual thing
    // [], return '[]'
    // {}, return '{}'
  if (typeof obj === 'undefined' || typeof obj === 'function') {
    return undefined;
  } else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    if (counter === 0) {
      return `${obj}`;
    }
    return obj;
  } else if (typeof obj === 'string') {
    return '"' + obj +'"';
  } else if (Array.isArray(obj) && obj.length === 0) {
    return '[]';
  } else if (typeof obj === 'object' && Object.entries(obj).length === 0) {
    return '{}';
  } else {
    // recursive cases, is an object or array
    if (Array.isArray(obj)) {
      // loop through array if needed
          // shift off 1st value from obj, push onto resultObj inside []
          // return invocation of obj
      let currentThing = [];
      do {
        currentThing.push(stringifyJSON(obj.shift(), resultObj = [], counter + 1));
      } while (obj.length > 0);
      if (counter === 0) {
        resultObj = currentThing;
      } else {
        resultObj.push(currentThing); // resultObj is still an array!
      }
    } else {
      // loop through Object.entries() of obj if needed, concatenating prop name and value to resultObj
      if (counter === 0) {
        resultObj = '';
      }
      let entries = Object.entries(obj);
      let key, value, result;
      while (entries.length > 0) {
        key = entries[0][0];
        value = entries[0][1];
        // recursively (if needed) generates a result string
        result = stringifyJSON(value, resultObj, counter + 1);
        entries = entries.slice(1);
        // ignores values that were undefined or a function
        if (result !== undefined) {
          // concatenates the formatted result string of prop value onto resultObj
          resultObj += '"' + key + '":' + result + `${entries.length > 0 ? ',' : ''}`;
        }
        delete obj[key];
      }
    }
  }
  // obj is empty, return resultObj
  if (Array.isArray(resultObj)) {
    // resultObj here is still an array, but Array.toString() creates a useable string
    return '[' + resultObj + ']';
  } else {
    return '{' + resultObj + '}';
  }
};
