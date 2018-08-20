export const handleStatus = res => {
  let ret;
  if (res.ok) {
    ret = res.json();
  } else {
    ret = Promise.reject(res.statusText);
  }

  return ret;
};

export const log = param => {
  console.log(param);
  return param;
};

export const promiseTimeout = (timeInMilliseconds, promise) => {
  const timeoutPromise = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Limit time exceeded: ${timeInMilliseconds} millis`), timeInMilliseconds)
  );

  return Promise.race([timeoutPromise, promise]);
};

export const delay = time => data => new Promise((resolve, reject) => setTimeout(() => resolve(data), time));

export const retry = (retries, timeInMilliseconds, fn) =>
  fn().catch(err => {
    console.log(`Remaining tries: ${retries}`);
    return delay(timeInMilliseconds)().then(
      () => (retries > 1 ? retry(--retries, timeInMilliseconds, fn) : Promise.reject(err))
    );
  });
