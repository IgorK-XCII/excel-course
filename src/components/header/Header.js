import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().titleState;
    return `
            <input type="text" class="input" placeholder="New table" value="${title}">
            <div>
                <div class="button" data-button="delete">
                    <i class="material-icons" data-button="delete">delete</i>
                </div>

                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
    `;
  }
  onInput(event) {
    const text = $(event.target).text();
    this.$dispatch(changeTitle(text));
  }
  onClick(event) {
    const $target = $(event.target);
    const button = $target.data.button;
    if (button === 'delete') {
      const decision = confirm('You sure?');
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if (button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
