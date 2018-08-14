import { handleStatus } from '../utils/promise-helpers.js';
import '../utils/array-helpers.js';

const API = 'http://localhost:3000/invoices';

export const NotasService = {
  list() {
    return fetch(API).then(handleStatus);
  },
  sumItems(code) {
    return this.list().then(invoices =>
      invoices
        .flatMap(invoice => invoice.items)
        .filter(i => i.code == code)
        .reduce((total, item) => total + item.value, 0)
    );
  },
};
