import { log } from './utils/promise-helpers.js';
import { NotasService } from './invoice/service.js';
import { takeUntil, debounceTime } from './utils/operators.js';

const sumItems = debounceTime(
  300,
  takeUntil(3, () =>
    NotasService.sumItems('2143')
      .then(log)
      .catch(console.error)
  )
);

document.getElementById('btnLoad').onclick = sumItems;
