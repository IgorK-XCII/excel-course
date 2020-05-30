import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  let value;
  const style = {
    opacity: 1,
  };
  type === 'column' ?
      style.bottom = -$root.getCoords().bottom + 'px' :
      style.right = -$root.getCoords().right + 'px';
  $resizer.css(style);
  document.onmousemove = (e) => {
    if (type === 'column') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta + 'px';
      $resizer.css({
        right: -delta + 'px',
      });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta + 'px';
      $resizer.css({bottom: -delta + 'px'});
    }
  };
  document.onmouseup = () => {
    if (type === 'column') {
      $parent.css({width: value});
      $root
          .findAll(`[data-column='${$parent.data.column}']`)
          .forEach((el) => el.style.width = value);
    } else {
      $parent.css({height: value});
    }
    document.onmousemove = null;
    document.onmouseup = null;
    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    });
  };
}
