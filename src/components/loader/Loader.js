import {$} from '@core/dom';

export class Loader {
  toHTML() {
    return $
        .create('div', 'loader')
        .append($.create('div', 'lds-dual-ring'));
  }
}
