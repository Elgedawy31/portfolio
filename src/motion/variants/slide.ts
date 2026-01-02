export const slideLeft = (offset = 40) => ({
  hidden: { opacity: 0, x: offset },
  visible: { opacity: 1, x: 0 },
});
