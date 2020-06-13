import {defaultStyles} from '@/constants';
import {toInlineStyles} from '@core/utils';
import {parser} from '@core/parser';

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = '120px';
const DEFAULT_HEIGHT = '24px';

function createCell(rowIndex, tool) {
  return function(_, colIndex) {
    const styles = toInlineStyles(tool.getStyles(rowIndex, colIndex));
    const text = tool.getText(rowIndex, colIndex);
    return `
          <div
            class="cell"
            contenteditable
            data-column='${colIndex}'
            data-id='${rowIndex}:${colIndex}'
            data-value='${text}'
            style='${styles}; width: ${tool.getWidth(colIndex)}'
          >${parser(text)}</div>
    `;
  };
}

function toColumn(tool) {
  return function(el, index) {
    return `
          <div
            class="column"
            data-type="resizable"
            data-column='${index}'
            style='width: ${tool.getWidth(index)}'>
              ${el}
              <div class="column-resize" data-resize="column"></div>
          </div>`;
  };
}

function createRow(content, rowNumber = '', tool) {
  const height = tool ? tool.getHeight(rowNumber - 1) : DEFAULT_HEIGHT;
  return `
        <div class="row" data-type="resizable" data-row="${rowNumber - 1}" style="height: ${height}">
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

function toRowWithCells(columnsCount, getSize) {
  return function(_, index) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(index, getSize))
        .join('');
    return createRow(cells, index + 1, getSize);
  };
}
function getTool(state) {
  const size = state.resizeState;
  const text = state.dataState;
  const styles = state.stylesState;
  return {
    getWidth: index => size[index] ? size[index].width : DEFAULT_WIDTH,
    getHeight: index => size[index] ? size[index].height : DEFAULT_HEIGHT,
    getText: (rowI, colI) => text[`${rowI}:${colI}`] || '',
    getStyles: (rowI, colI) => ({...defaultStyles, ...styles[`${rowI}:${colI}`]}),
  };
}
export function createTable(rowCount = 15, state = {}) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(getTool(state)))
      .join('');

  rows.push(createRow(columns));

  rows.push(new Array(rowCount)
      .fill('')
      .map(toRowWithCells(columnsCount, getTool(state)))
      .join(''));

  return rows.join(``);
}
