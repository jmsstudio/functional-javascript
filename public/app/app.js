import { log } from './utils/promise-helpers.js';
import { NotasService } from './invoice/service.js';

document.getElementById('btnLoad').onclick = () =>
  NotasService.sumItems('2143')
    .then(log)
    .catch(console.error);
