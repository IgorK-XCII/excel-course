import {$} from '@core/dom';
import {isCell} from '@/components/table/table.functions';

export function multipleSelectorHandler($root, current, selection) {
  let lastEl;
  document.onmousemove = (e) => {
    [lastEl] = e.path;
  };
  document.onmouseup = (e) => {
    if (lastEl && isCell(e)) {
      const firstCell = current.id(true);
      const lastCell = $(lastEl).id(true);
      const $cells = getCells(firstCell, lastCell)
          .reduce((acc, el) => {
            el.forEach((el) => {
              acc.push($root.find(`[data-id="${el[0]}:${el[1]}"]`));
            });
            return acc;
          }, []);
      selection.selectGroup($cells);
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

function getCells(firstCell, lastCell) {
  const rowRange = Math.abs(lastCell.row - firstCell.row) + 1;
  const colRange = Math.abs(lastCell.col - firstCell.col) + 1;
  const rowStart = firstCell.row < lastCell.row ? firstCell.row : lastCell.row;
  const colStart = firstCell.col < lastCell.col ? firstCell.col : lastCell.col;
  return new Array(rowRange)
      .fill('')
      .map(getCellsId(colRange, rowStart, colStart));
}

function getCellsId(range, rowStart, colStart) {
  return function(_, rowId) {
    return new Array(range)
        .fill('')
        .map((_, index) => [rowId + rowStart, index + colStart]);
  };
}
