import { motion } from "framer-motion";

const ScrollHint = ({ opacityMV, active }) => (
  <motion.div
    className="absolute bottom-[7vh] right-[5vw] flex items-center justify-end z-[6500] pointer-events-none"
    style={{ opacity: opacityMV }}
    initial={{ y: 8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 18 }}
  >
    <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm md:text-base flex items-center gap-2 animate-pulse">
      <span>
        {active ? "Scroll to explore your journey 🚀" : "Begin Your Journey 🚀"}
      </span>
    </div>
  </motion.div>
);

export default ScrollHint;
