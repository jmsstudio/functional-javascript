if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function(callback) {
    return this.map(callback).reduce((acumulatorArray, array) => acumulatorArray.concat(array), []);
  };
}
