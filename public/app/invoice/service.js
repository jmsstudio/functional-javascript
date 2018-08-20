import { handleStatus } from '../utils/promise-helpers.js';
import '../utils/array-helpers.js';
import { partialize, pipe } from '../utils/operators.js';

const API = 'http://localhost:3000/invoices';

const getItemsFromInvoices = invoices => invoices.flatMap(invoice => invoice.items);
const filterItemsByCode = (code, items) => items.filter(i => i.code == code);
const sumItemsValue = items => items.reduce((total, item) => total + item.value, 0);

export const NotasService = {
  list() {
    return fetch(API).then(handleStatus);
  },

  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);
    const sumItems = pipe(
      getItemsFromInvoices,
      filterItems,
      sumItemsValue
    );

    return this.list().then(invoices => sumItems(invoices));
  },
};
