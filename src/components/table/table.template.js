const CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, colIndex) {
  return `<div class="cell" contenteditable data-column='${colIndex}'></div>`;
}

function toColumn(el, index) {
  return `
      <div class="column" data-type="resizable" data-column='${index}'>
        ${el}
        <div class="column-resize" data-resize="column"></div>
      </div>
`;
}

function createRow(content, rowNumber = '') {
  return `
    <div class="row" data-type="resizable" >
        <div class="row-info" >${rowNumber}
            ${rowNumber && '<div class="row-resize" data-resize="row"></div>'}
        </div>
        <div class="row-data">${content}</div>
    </div>
`;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
function toCell(index, columnsCount) {
  const cells = new Array(columnsCount)
      .fill('')
      .map(createCell)
      .join('');
  return createRow(cells, index + 1);
}

export function createTable(rowCount = 15, ) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(columns));

  rows.push(new Array(rowCount)
      .fill('')
      .map((el, index) => toCell(index, columnsCount))
      .join(''));

  return rows.join(``);
}
