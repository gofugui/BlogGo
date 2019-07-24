// Find components upward
function findComponentsUpward(context, componentName) {
  const parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  }
  return [];
}

// Find brothers components
function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter(item => item.$options.name === componentName);
  const index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export default {
  findBrothersComponents,
  findComponentsUpward,
};
