import { log } from './utils/promise-helpers.js';
import { NotasService } from './invoice/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';

//creates a pipe to execute the functions starting from the last
const composedOperations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 300)
);

const sumItems = composedOperations(() =>
  NotasService.sumItems('2143')
    .then(log)
    .catch(console.error)
);

document.getElementById('btnLoad').onclick = sumItems;
