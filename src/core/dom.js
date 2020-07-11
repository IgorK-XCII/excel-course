class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  text(text) {
    if (text || text === '') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value;
    }
    return this.$el.textContent;
  }
  clear() {
    this.html('');
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  get data() {
    return this.$el.dataset;
  }
  focus() {
    this.$el.focus();
    return this;
  }
  isNotEmpty() {
    return !!this.$el;
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  css(styles = {}) {
    Object.assign(this.$el.style, styles);
  }
  getStyles(styles = []) {
    return styles.reduce((sum, style) => {
      sum[style] = this.$el.style[style];
      return sum;
    }, {});
  }
  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':');
      return {
        row: +row,
        col: +col,
      };
    }
    return this.data.id;
  }
  attr(name, value) {
    if (value || value === '') {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
