import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {Loader} from '@/components/loader/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required!');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.loader = new Loader();
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }
  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear().append(this.loader.toHTML());

    const Page = this.routes[ActiveRoute.componentPath] || this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);

    this.page.afterRender();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
