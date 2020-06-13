export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }
  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus();
    $el.addClass(TableSelection.className);
  }
  get ids() {
    return this.group.map($el => $el.id());
  }
  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
  selectGroup($els) {
    this.clear();
    this.group = $els;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }
  applyStyle(style) {
    this.group.forEach($el => {
      $el.css(style);
    });
  }
}
