import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, PhoneCall, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "Do I need any computer knowledge to join?",
      answer: "No. This course starts from the basics, so complete beginners can learn with confidence."
    },
    {
      id: "faq-2",
      question: "Is this course in Tamil?",
      answer: "Yes. All lessons are explained in simple and easy-to-understand Tamil."
    },
    {
      id: "faq-3",
      question: "Will I get lifetime access?",
      answer: "Yes. You can watch the recorded classes anytime with lifetime access."
    },
    {
      id: "faq-4",
      question: "Are the classes live or recorded?",
      answer: "The course includes HD recorded classes, so you can learn at your own pace."
    },
    {
      id: "faq-5",
      question: "Will I receive support if I have doubts?",
      answer: "Yes. Student support is available to help you with your learning."
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-100/30 filter blur-3xl rounded-full pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
          <span>Clarifications</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="font-sans text-sm text-gray-500 mt-2">
          Clear answers about eligibility, course language, access models, and support options.
        </p>
      </div>

      {/* Accordion container */}
      <div className="space-y-4 mb-16">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? "border-gray-300 shadow-sm" : "border-gray-150 hover:border-gray-300"
              }`}
            >
              <button
                id={`faq-btn-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-sans font-semibold text-gray-900 text-sm md:text-base cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-gray-600 leading-relaxed font-sans border-t border-gray-50 bg-gray-50/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>



    </section>
  );
}
