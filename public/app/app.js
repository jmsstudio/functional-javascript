import { handleStatus } from './utils/promise-helpers.js';

document.getElementById('btnLoad').onclick = () =>
  fetch('http://localhost:3000/invoices')
    .then(res => handleStatus(res))
    .then(invoices => console.log(invoices))
    .catch(err => console.error(err));
