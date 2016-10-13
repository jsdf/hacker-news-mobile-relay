function objectify(list) {
  var object = {};
  list.forEach(item => {
    object[item.id] = item;
  });
  return object;
}

function disjointMerge(...operands) {
  const merged = {};
  for (var i = 0; i < operands.length; i++) {
    var operand = operands[i];
    var operandKeys = Object.keys(operand);
    for (var j = 0; j < operandKeys.length; j++) {
      var key = operandKeys[j];
      if (key in merged) {
        throw new Error(`Duplicate key "${key}" encountered while merging objects`);
      }
      merged[key] = operand[key];
    }
  }
  return merged;
}

module.exports = {
  objectify,
  disjointMerge,
};
