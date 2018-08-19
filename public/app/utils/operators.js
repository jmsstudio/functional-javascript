export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...functions) => param => functions.reduceRight((prevVal, func) => func(prevVal), param);

export const pipe = (...functions) => param => functions.reduce((prevVal, func) => func(prevVal), param);
