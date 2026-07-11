import { motion } from "motion/react";

export default function FloatingCardsDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* LEFT SIDE MARGIN CARDS */}
      <div className="absolute left-3 md:left-6 lg:left-12 top-[12%] flex flex-col gap-8 md:gap-12">
        {/* Soft pastel lavender with plus */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [-15, 12, -15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-tr from-violet-200 via-indigo-100 to-blue-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center"
          style={{ transform: "rotate(-15deg)" }}
        >
          <span className="text-violet-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>

        {/* Soft peach blank card */}
        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [12, -15, 12],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-rose-200 via-amber-100 to-orange-100 shadow-md border-2 border-white/60 backdrop-blur-xs ml-2 md:ml-4"
          style={{ transform: "rotate(12deg)" }}
        />
      </div>

      <div className="absolute left-2 md:left-4 lg:left-8 top-[32%] flex flex-col gap-10">
        {/* Soft emerald blank card */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [8, -12, 8],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 md:w-15 md:h-15 rounded-2xl bg-gradient-to-tr from-emerald-200 via-teal-100 to-cyan-100 shadow-md border-2 border-white/60 backdrop-blur-xs"
          style={{ transform: "rotate(8deg)" }}
        />

        {/* Soft rose card with plus */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [-10, 15, -10],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center ml-2"
          style={{ transform: "rotate(-10deg)" }}
        >
          <span className="text-rose-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>
      </div>

      <div className="absolute left-3 md:left-6 lg:left-10 top-[52%] flex flex-col gap-12">
        {/* Soft sky-blue blank card */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [-8, 8, -8],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-sky-200 via-cyan-100 to-blue-100 shadow-md border-2 border-white/60 backdrop-blur-xs"
          style={{ transform: "rotate(-5deg)" }}
        />
      </div>

      <div className="absolute left-2 md:left-4 lg:left-12 top-[72%] flex flex-col gap-10">
        {/* Soft purple card with plus */}
        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [18, -12, 18],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1,
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-200 via-indigo-100 to-violet-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center"
          style={{ transform: "rotate(18deg)" }}
        >
          <span className="text-purple-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>
      </div>

      {/* RIGHT SIDE MARGIN CARDS */}
      <div className="absolute right-3 md:right-6 lg:right-12 top-[16%] flex flex-col gap-8 md:gap-12">
        {/* Pastel pink card with plus */}
        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [22, -18, 22],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-tr from-pink-200 via-rose-100 to-pink-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center"
          style={{ transform: "rotate(22deg)" }}
        >
          <span className="text-pink-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>

        {/* Pastel violet blank card */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [-12, 15, -12],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 5.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="w-12 h-12 md:w-15 md:h-15 rounded-2xl bg-gradient-to-br from-indigo-200 via-purple-100 to-violet-100 shadow-md border-2 border-white/60 backdrop-blur-xs mr-2 md:mr-4"
          style={{ transform: "rotate(-12deg)" }}
        />
      </div>

      <div className="absolute right-2 md:right-4 lg:right-8 top-[36%] flex flex-col gap-10">
        {/* Soft yellow/orange blank card */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [-8, 8, -8],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 md:w-15 md:h-15 rounded-xl bg-gradient-to-tr from-amber-200 via-orange-100 to-rose-100 shadow-md border-2 border-white/60 backdrop-blur-xs"
          style={{ transform: "rotate(-6deg)" }}
        />

        {/* Soft slate-blue card with plus */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [15, -15, 15],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-200 via-slate-100 to-indigo-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center mr-1 md:mr-2"
          style={{ transform: "rotate(15deg)" }}
        >
          <span className="text-blue-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>
      </div>

      <div className="absolute right-3 md:right-6 lg:right-10 top-[56%] flex flex-col gap-12">
        {/* Pastel mint green card with plus */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [-20, 15, -20],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-emerald-200 via-teal-100 to-cyan-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center"
          style={{ transform: "rotate(-20deg)" }}
        >
          <span className="text-emerald-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>
      </div>

      <div className="absolute right-2 md:right-4 lg:right-12 top-[76%] flex flex-col gap-10">
        {/* Soft gold blank card */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [12, -8, 12],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="w-12 h-12 md:w-15 md:h-15 rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-100 shadow-md border-2 border-white/60 backdrop-blur-xs mr-2"
          style={{ transform: "rotate(10deg)" }}
        />
      </div>

      {/* BOTTOM MARGIN CARDS (Above FAQ / near footer) */}
      <div className="absolute bottom-24 left-[8%] flex gap-6">
        {/* Mint green card with plus */}
        <motion.div
          animate={{
            y: [0, -16, 0],
            rotate: [-18, 12, -18],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-13 h-13 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-emerald-200 via-teal-100 to-cyan-100 shadow-md border-2 border-white/60 backdrop-blur-xs flex items-center justify-center"
          style={{ transform: "rotate(-18deg)" }}
        >
          <span className="text-emerald-600 font-bold text-xl md:text-2xl font-sans">+</span>
        </motion.div>
      </div>

      <div className="absolute bottom-32 right-[12%] flex gap-6">
        {/* Soft lavender card */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [12, -15, 12],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 md:w-15 md:h-15 rounded-2xl bg-gradient-to-tr from-purple-200 via-violet-100 to-fuchsia-100 shadow-md border-2 border-white/60 backdrop-blur-xs"
          style={{ transform: "rotate(12deg)" }}
        />
      </div>
    </div>
  );
}
