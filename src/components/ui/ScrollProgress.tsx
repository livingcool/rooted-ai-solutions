import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-black/5 dark:bg-white/5 z-50 rounded-full overflow-hidden hidden md:block"
    >
      <motion.div
        style={{ scaleY }}
        className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
      />
    </motion.div>
  );
};

export default ScrollProgress;
