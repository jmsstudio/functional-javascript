import { handleStatus } from '../utils/promise-helpers.js';
import '../utils/array-helpers.js';
import { partialize, pipe } from '../utils/operators.js';
import Monad from '../utils/monad.js';

const API = 'http://localhost:3000/invoices';

const getItemsFromInvoices = invoicesMonad => invoicesMonad.map(invoices => invoices.flatMap(invoice => invoice.items));
const filterItemsByCode = (code, itemsMonad) => itemsMonad.map(items => items.filter(i => i.code == code));
const sumItemsValue = itemsMonad => itemsMonad.map(items => items.reduce((total, item) => total + item.value, 0));

export const NotasService = {
  list() {
    return fetch(API)
      .then(handleStatus)
      .then(value => Monad.of(value))
      .catch(err => {
        console.error(err);
        Promise.reject('Unable to fetch data');
      });
  },

  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);
    const sumItems = pipe(
      getItemsFromInvoices,
      filterItems,
      sumItemsValue
    );

    return this.list()
      .then(sumItems)
      .then(result => result.getOrElse(0));
  },
};
