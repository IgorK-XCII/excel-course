import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
    const input = this.$root.find('[data-content="formula-input"]');
    this.$sub('table:input', (data) => {
      input.text(data.text());
    });
    this.$sub('table:select', (data) => {
      input.text(data.text());
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
