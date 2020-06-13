import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize, getNextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {multipleSelectorHandler} from '@/components/table/table.multyleSelector';
import {changeText} from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parser} from '@core/parser';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';

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
    return createTable(20, this.store.getState());
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$sign('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parser(value));
      this.updateTextInStore(value);
    });
    this.$sign('formula:done', () => {
      this.selection.current.focus();
    });
    this.$sign('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.ids,
      }));
    });
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    const hash = Date.now();
    const hashStyles = {[hash]: styles};
    this.$dispatch(actions.changeStyles(hashStyles));
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize table:', e.message);
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
  updateTextInStore(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value,
    }));
  }
  onInput() {
    this.selection.current.attr('data-value', '');
    this.updateTextInStore(this.selection.current.text());
  }
}
