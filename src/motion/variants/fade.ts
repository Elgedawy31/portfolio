import { motionTokens } from "../tokens";

export const fadeUp = (offset = motionTokens.offset.md) => ({
  hidden: { opacity: 0, y: offset },
  visible: { opacity: 1, y: 0 },
});

export const fadeIn = () => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
});

export const fadeDown = (offset = motionTokens.offset.md) => ({
  hidden: { opacity: 0, y: -offset },
  visible: { opacity: 1, y: 0 },
});
