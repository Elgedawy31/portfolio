export const slideLeft = (offset = 40) => ({
  hidden: { opacity: 0, x: offset },
  visible: { opacity: 1, x: 0 },
});

export const slideRight = (offset = 40) => ({
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: offset },
});
