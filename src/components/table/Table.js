import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize, getNextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {multipleSelectorHandler} from '@/components/table/table.multyleSelector';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$emit('table:select', this.selection.current);
    this.$sub('formula:input', (data) => {
      this.selection.current.text(data);
    });
    this.$sub('formula:done', () => {
      this.selection.current.focus();
    });
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
    if (isCell(event)) {
      this.selectCell($(event.target));
      multipleSelectorHandler(this.$root, this.selection.current, this.selection);
    }
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    const pressedKey = event.key;
    if (keys.includes(pressedKey) && !event.shiftKey) {
      event.preventDefault();
      const nextSelector = getNextSelector(pressedKey, this.selection.current.id(true));
      const $nextCell = this.$root.find(nextSelector);
      if ($nextCell.isNotEmpty()) {
        this.selectCell($nextCell);
      }
    }
  }
  onInput() {
    this.$emit('table:input', this.selection.current);
  }
}
