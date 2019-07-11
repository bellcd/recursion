// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, currentNode = document.body, result = []) {
  // base case, current node's childNode property has length 0
    // return the current node
  if (currentNode.childNodes.length === 0) {
    return currentNode;
  }
  // recursive case, current node's childNodes property has length > 0
  if (currentNode.childNodes.length > 0) {
    // if current node is element & has className, push current node to result array
    if (currentNode.nodeType === 1 && currentNode.classList.contains(className)) {
      result.push(currentNode);
    }
    // is there a way to avoid using a forEach() loop here ??
    Array.from(currentNode.childNodes).forEach(node => {
      // loop through childNodes list
      // invoke recursion on each child node,
      let value = getElementsByClassName(className, node, result);
      // if returned value is an element with the target class, push node to result array
      if (value.nodeType === 1 && value.classList.contains(className)) {
        result.push(value);
      }
    });
  }
  // return current status of result array for this recursive depth
  return result;
};
