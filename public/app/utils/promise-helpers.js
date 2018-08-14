export const handleStatus = res => {
  let ret;
  if (res.ok) {
    ret = res.json();
  } else {
    ret = Promise.reject(res.statusText);
  }

  return ret;
};
