import {storage} from '@core/utils';

function toHTML(key) {
  const store = storage(key);
  const url = key.split(':')[1];
  const tableName = store.titleState || 'New table';
  const date = new Date(+store.date).toLocaleString();
  return `                
    <li class="db__record">
      <a href="#excel/${url}">${tableName}</a>
      <strong>${date}</strong>
    </li>
  `;
}

function getAllKeys() {
  return new Array(localStorage.length)
      .fill('')
      .reduce((acc, _, i) => {
        const key = localStorage.key(i);
        if (key.includes('excel')) {
          acc.push(key);
        }
        return acc;
      }, []);
}


export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>No records</p>`;
  }
  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Opening date</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `;
}
