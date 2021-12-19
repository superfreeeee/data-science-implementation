export const autoScrollDown = (el, horizantal) => {
  if (horizantal) {
    el.scrollLeft = el.scrollWidth;
  } else {
    el.scrollTop = el.scrollHeight;
  }
};
