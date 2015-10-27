export const IF_TOUCH = ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);

export const handleEvents = (e, handler) => {
  e.preventDefault();
  return handler();
};
