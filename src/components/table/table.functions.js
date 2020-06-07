export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.id;
}

export function getNextSelector(pressedKey, {row, col}) {
  switch (pressedKey) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowLeft':
      col ? col-- : col;
      break;
    case 'ArrowUp':
      row ? row-- : row;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
