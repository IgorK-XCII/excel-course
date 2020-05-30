import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
    }
  }
}
