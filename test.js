function test(a) {
  return new Promise((resolve, reject) => {
    if (a > 10) {
      resolve(a);
    } else {
      reject(a);
    }
  });
}


test(11)
  .then(x => x * 2)
  .then(x => x * 10)
  .then((x) => {
    console.log(x);
    return x;
  })
  .catch((x) => {
    console.log('mdr ça a pas marché wsh');
    return x;
  })
  .then(x => console.log(x));
