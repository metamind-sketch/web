import { motion } from "motion/react";
import { Shield, Sparkles, UserCheck, CreditCard, Layers, PhoneCall, CheckCircle, BookOpen, Video } from "lucide-react";
import { TrustCard } from "../types";

export default function WhyChooseUs() {
  const trustFactors: TrustCard[] = [
    {
      id: "beginner-friendly",
      title: "Beginner Friendly",
      description: "Easy step-by-step learning for complete beginners.",
      iconName: "BookOpen"
    },
    {
      id: "practical-learning",
      title: "Practical Learning",
      description: "Learn with real-world examples and hands-on practice.",
      iconName: "Layers"
    },
    {
      id: "lifetime-access",
      title: "♾️ Lifetime Access",
      description: "Access the course anytime and revise whenever you want.",
      iconName: "Sparkles"
    },
    {
      id: "affordable-training",
      title: "Affordable & High-Quality Training",
      description: "Premium-quality training at a budget-friendly price.",
      iconName: "CreditCard"
    },
    {
      id: "hd-classes",
      title: "HD Recorded Classes",
      description: "Clear, high-quality video lessons you can watch anytime.",
      iconName: "Video"
    },
    {
      id: "tamil-language",
      title: "Tamil Language",
      description: "Learn in easy-to-understand Tamil for better understanding.",
      iconName: "UserCheck"
    }
  ];

  // Helper to render lucide icons dynamically
  const renderIcon = (name: string) => {
    switch (name) {
      case "BookOpen": return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case "Layers": return <Layers className="w-5 h-5 text-rose-500" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-amber-500" />;
      case "CreditCard": return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case "Video": return <Video className="w-5 h-5 text-blue-500" />;
      case "UserCheck": return <UserCheck className="w-5 h-5 text-purple-500" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 to-transparent pointer-events-none" />

      {/* Floating Animated Cards from the reference image (Right Side) */}
      <div className="absolute right-6 top-1/4 hidden xl:flex flex-col gap-8 select-none pointer-events-none z-10">
        {/* Pastel lavender/blue card with a plus symbol */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [28, 34, 28]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-indigo-100/80 via-blue-100/70 to-indigo-50/90 shadow-xs flex items-center justify-center border border-indigo-200/40 backdrop-blur-xs"
          style={{ transform: "rotate(28deg)" }}
        >
          <span className="text-indigo-500/70 font-light text-2xl font-sans select-none">+</span>
        </motion.div>

        {/* Pastel pink/peach/green card */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [-16, -10, -16]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100/70 via-amber-50/60 to-emerald-100/50 shadow-xs border border-rose-200/40 backdrop-blur-xs ml-6"
          style={{ transform: "rotate(-16deg)" }}
        />
      </div>

      {/* Floating Animated Cards from the reference image (Left Side) */}
      <div className="absolute left-6 bottom-1/4 hidden xl:flex flex-col gap-6 select-none pointer-events-none z-10">
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            rotate: [-22, -26, -22]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-bl from-emerald-100/50 via-teal-50/60 to-cyan-100/60 shadow-xs border border-cyan-200/40 backdrop-blur-xs"
          style={{ transform: "rotate(-22deg)" }}
        />
      </div>

      {/* Header details */}
      <div className="text-center max-w-xl mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-mono text-gray-500 uppercase tracking-widest mb-3"
        >
          <span>Academy Benefits</span>
        </motion.div>
        
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-semibold tracking-tight">
          Why Learn With Us?
        </h2>
        
        <p className="font-sans text-sm text-gray-500 mt-2">
          Start from scratch and build high-demand computer skills with Coimbatore's best self-paced technical institute.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {trustFactors.map((factor, index) => (
          <motion.div
            key={factor.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-gray-100/90 hover:border-gray-300 rounded-2xl p-5 md:p-6 shadow-xs hover:shadow-md transition-all group"
          >
            <div>
              {/* Icon layout */}
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                {renderIcon(factor.iconName)}
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-1.5">
                {factor.title}
              </h3>
              
              <p className="font-sans text-xs text-gray-500 leading-relaxed">
                {factor.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
