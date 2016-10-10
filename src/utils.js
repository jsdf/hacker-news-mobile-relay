export function objectify(list) {
  var object = {};
  list.forEach(item => {
    object[item.id] = item;
  });
  return object;
}
