import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }
  static className = 'excel__formula';
  toHTML() {
    return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true"
                spellcheck="false"
                data-content="formula-input"
            ></div>
    `;
  }
  init() {
    super.init();
    this.$formula = this.$root.find('[data-content="formula-input"]');
    this.$sign('table:select', ($cell) => {
      this.$formula.text($cell.data.value || $cell.text());
    });
  }
  storeChanged({currentText}) {
    Object.keys(currentText).forEach(key => {
      this.$formula.text(currentText[key]);
    });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }
  onKeydown(event) {
    const keys = ['Tab', 'Enter'];
    const {key} = event;
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done', true);
    }
  }
}
