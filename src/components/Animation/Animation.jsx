export const fadeInVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, opacity: 1, x: 0, transition: { duration: 0.5, ease: "linear" } }
}
export const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09, // word-by-word animation delay
    },
  },
};
export const child = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0)', // Blur will clear out during animation
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};