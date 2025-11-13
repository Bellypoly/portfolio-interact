import { motion } from "framer-motion";

const ScrollHint = ({ opacityMV }) => (
  <motion.div
    className="absolute bottom-[7vh] right-[5vw] flex items-center justify-end z-[6500] pointer-events-none"
    style={{ opacity: opacityMV }}
    initial={{ y: 8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 18 }}
  >
    <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm md:text-base flex items-center gap-2 animate-pulse">
      <span>Scroll to explore my journey 🚀</span>
    </div>
  </motion.div>
);

export default ScrollHint;
