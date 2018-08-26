class Monad {
  constructor(val) {
    this._value = val;
  }

  static of(value) {
    return new Monad(value);
  }

  isNothing() {
    return this._value == null;
  }

  map(fn) {
    let ret = null;
    if (this.isNothing()) {
      ret = Monad.of(null);
    } else {
      ret = Monad.of(fn(this._value));
    }

    return ret;
  }

  getOrElse(val) {
    return this.isNothing() ? val : this._value;
  }
}

export default Monad;
