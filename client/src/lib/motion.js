export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const fadeRise = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const itemRise = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const cardHover = {
  whileHover: {
    y: -2,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

export const buttonPress = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
};
