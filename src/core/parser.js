export function parser(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.warn('Parser', e);
    }
  }
  return value;
}
