export const getTimer = () => +new Date();

function log(target) {
  target.isTestable = true;
}

@log
class TestClass {
  att = 1;
}

export const getLazyData = () => {
  return "data";
};

export { TestClass };
