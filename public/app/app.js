import { promiseTimeout, retry } from './utils/promise-helpers.js';
import { NotasService } from './invoice/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';
import { EventEmitter } from './utils/event-emitter.js';

//creates a pipe to execute the functions starting from the last
const composedOperations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 300)
);

const sumItems = composedOperations(() =>
  retry(10, 5000, () => promiseTimeout(200, NotasService.sumItems('2143')))
    .then(total => EventEmitter.emit('sumCalculated', total))
    .catch(console.error)
);

document.getElementById('btnLoad').onclick = sumItems;
