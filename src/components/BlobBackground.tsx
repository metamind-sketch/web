import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { BlobColor } from "../types";

interface BlobBackgroundProps {
  currentTheme: BlobColor;
}

export default function BlobBackground({ currentTheme }: BlobBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Organic Gradient Blobs (Left and Center-Left) - COMPLETELY STATIC */}
      <div className="absolute top-0 left-0 w-full h-full max-w-(--size-xs) sm:max-w-none">
        {/* Mint / Pale Green Blob */}
        <div
          className={`absolute top-[10%] left-[10%] w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full filter blur-3xl opacity-50 mix-blend-multiply transition-colors duration-1000 ${currentTheme.color1}`}
        />

        {/* Apricot / Soft Peach Blob */}
        <div
          className={`absolute top-[25%] left-[5%] w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full filter blur-3xl opacity-45 mix-blend-multiply transition-colors duration-1000 ${currentTheme.color2}`}
        />

        {/* Soft Teal / Blue-Green Blob */}
        <div
          className={`absolute top-[45%] left-[8%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full filter blur-3xl opacity-40 mix-blend-multiply transition-colors duration-1000 ${currentTheme.color3}`}
        />
      </div>

      {/* 2. Floating Tilted Squares (Right) - Now with smooth gentle continuous floating animation */}
      <motion.div
        className="absolute right-[4%] top-[10%] pointer-events-auto"
        animate={{
          y: [0, -8, 0],
          rotate: [24, 27, 24],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-gradient-to-tr from-indigo-200/50 via-purple-100/40 to-blue-200/40 border border-white/60 shadow-xs backdrop-blur-md flex items-center justify-center">
          {/* Accent plus in upper right of the card */}
          <Plus className="absolute top-4 right-4 w-4 h-4 text-gray-500/60 font-light" strokeWidth={1} />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[2%] top-[45%] pointer-events-auto"
        animate={{
          y: [0, 8, 0],
          rotate: [-15, -12, -15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-teal-100/40 via-amber-50/40 to-rose-100/40 border border-white/60 shadow-xs backdrop-blur-md flex items-center justify-center">
          <Plus className="absolute bottom-4 left-4 w-4 h-4 text-gray-500/50 font-light" strokeWidth={1} />
        </div>
      </motion.div>

      {/* 3. Small Plus Icons */}
      <div className="absolute left-[20%] bottom-[15%] flex flex-col gap-4 text-gray-400 opacity-60">
        <Plus className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
        <Plus className="w-5 h-5 text-gray-500 translate-x-4" strokeWidth={1.5} />
      </div>

      <div className="absolute right-[35%] top-[10%] text-gray-400 opacity-50">
        <Plus className="w-4 h-4 text-gray-400" strokeWidth={1} />
      </div>

      {/* Thin line elements / subtle grid structure */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60" />
    </div>
  );
}
