export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...functions) => param => functions.reduceRight((prevVal, func) => func(prevVal), param);

export const pipe = (...functions) => param => functions.reduce((prevVal, func) => func(prevVal), param);

export const takeUntil = (times, fn) => () => {
  if (times-- > 0) {
    fn();
  }
};

export const debounceTime = (timeInMillis, fn) => {
  let timer = 0;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, timeInMillis);
  };
};
