
const keys = (obj) => {
  try {
    return Object.keys(obj);
  } catch (e) {
    console.error(e);
    return [];
  }
};
exports.keys = keys;

exports.values = (obj) => Object.keys(obj).map(k => obj[k]);
exports.isTrue= (func) => {
  try {
    return func();
  } catch (e) {
    return false;
  }
};
