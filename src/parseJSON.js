// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
    // typeof json is actually a string, remove extra quotes and return
      if (json[0] === '"' || json[0] === "'" || json[json.length - 1] === '"' || json[json.length - 1] === "'") return json.slice(1, -1);
    // else if, json is a primitive
      // convert json string to actual primitive and return
      let trimmedJSON = json.trim();
      if (trimmedJSON === 'true') return true;
      if (trimmedJSON === 'false') return false;
      if (trimmedJSON === 'null') return null;
      if (trimmedJSON === 'NaN') return NaN;
      if (trimmedJSON === 'undefined') return undefined;
      if (!Number.isNaN(Number.parseFloat(json)) && typeof Number.parseFloat(json) === 'number') return Number.parseFloat(json);

      // regex
      // TODO: get this regex to work for all tests 
      // /(?<=.*:[^"|']+)(?:, |,)|(?<=(?:".*"))(?:, |,)/

  // json is obj / array, reduce through json
    // obj, return key: recursive call to value
      if (json === '{}') return {};
      if (json[0] === '{' && json[json.length - 1] === '}') {
          return json.slice(1, -1).split(/(?<=.*:[^"|']+)(?:, |,)|(?<=(?:".*"))(?:, |,)/).reduce((acc, currentValue) => {
              let keyValueArr = [];
              let index = currentValue.indexOf(':')
              keyValueArr[0] = currentValue.slice(0, index);
              keyValueArr[1] = currentValue.slice(index + 1);
              keyValueArr[1] = keyValueArr[1].trim(); // does this work for all values??
              let key = keyValueArr[0].slice(1, -1);
              let value = keyValueArr[1];
              acc[key] = parseJSON(value);
              return acc;
          }, {});
      }
    // array, return recursive call to value
      if (json === '[]') return [];
      if (json[0] === '[' && json[json.length - 1] === ']') {
        return json.slice(1, -1).split(/, |,/).reduce((acc, currentValue) => {
          acc.push(parseJSON(currentValue));
          return acc;
        }, []);
      }

      return Number.parseFloat(json) // will need to handle other non valid conditions before this!!
};
