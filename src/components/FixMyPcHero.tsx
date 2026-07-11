import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Calendar, Check, AlertCircle, ShieldCheck, Clock, Award, Sparkles, RefreshCw, Cpu, HardDrive } from "lucide-react";
import { Booking } from "../types";

interface FixMyPcHeroProps {
  onAddBooking: (booking: Booking) => void;
  bookingCount: number;
  prefilledService?: string;
}

const COURSES_LIST = [
  "Computer Fundamentals",
  "Microsoft Office",
  "AI Tools Basics",
  "Internet Basics",
  "Software Installation & Updates",
  "Tally Prime"
];

export default function FixMyPcHero({ onAddBooking, bookingCount, prefilledService }: FixMyPcHeroProps) {
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceType, setServiceType] = useState(""); // Stores selected course
  const [userCaptcha, setUserCaptcha] = useState("");

  // Sync prefilled course when it changes
  useEffect(() => {
    if (prefilledService) {
      // Find matches or fallbacks
      const matched = COURSES_LIST.find(
        (c) => c.toLowerCase() === prefilledService.toLowerCase() || 
               prefilledService.toLowerCase().includes(c.toLowerCase()) ||
               c.toLowerCase().includes(prefilledService.toLowerCase())
      );
      if (matched) {
        setServiceType(matched);
      }
    }
  }, [prefilledService]);

  // Captcha State
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<"+" | "-">("+");
  const [correctAnswer, setCorrectAnswer] = useState(0);

  // Validation/Feedback State
  const [formError, setFormError] = useState("");
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Payment workflow states
  const [paymentStep, setPaymentStep] = useState<'form' | 'select_method' | 'razorpay' | 'success'>('form');
  const [pendingBooking, setPendingBooking] = useState<Booking | null>(null);
  const [qrTimer, setQrTimer] = useState(674); // 11:14
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Course price dynamic calculator helper
  const getCoursePrice = (courseName: string): number => {
    switch (courseName) {
      case "Computer Fundamentals": return 299;
      case "Microsoft Office": return 499;
      case "AI Tools Basics": return 399;
      case "Internet Basics": return 199;
      case "Software Installation & Updates": return 349;
      case "Tally Prime": return 99;
      default: return 99;
    }
  };

  interface CourseDetails {
    title: string;
    subtitle: string;
    features: string[];
    originalPrice: number;
    promoPrice: number;
    badge: string;
  }

  const getCourseDetails = (courseName: string): CourseDetails => {
    switch (courseName) {
      case "Computer Fundamentals":
        return {
          title: "Computer Fundamentals",
          subtitle: "Master Hardware, OS & Computer Basics",
          features: ["Operating Systems", "Keyboard Shortcuts", "Files & Folders", "Basic Troubleshooting"],
          originalPrice: 1499,
          promoPrice: 299,
          badge: "STARTER PACK"
        };
      case "Microsoft Office":
        return {
          title: "Microsoft Office Suite",
          subtitle: "Word, Excel & PowerPoint Boot camp",
          features: ["MS Word Documents", "MS Excel Sheets", "PowerPoint Slides", "Templates & Forms"],
          originalPrice: 2499,
          promoPrice: 499,
          badge: "OFFICE ESSENTIAL"
        };
      case "AI Tools Basics":
        return {
          title: "Artificial Intelligence Tools",
          subtitle: "Leverage ChatGPT, Gemini & Productivity Tools",
          features: ["AI Prompting", "Auto Content Creation", "AI Design Tools", "AI Voice & Text Tools"],
          originalPrice: 1999,
          promoPrice: 399,
          badge: "FUTURE SKILLS"
        };
      case "Internet Basics":
        return {
          title: "Safe Internet & Emailing",
          subtitle: "Browse Safely, Manage Emails & Cloud Storage",
          features: ["Google Drive & Cloud", "Email Communication", "Online Safety Rules", "Search Optimization"],
          originalPrice: 999,
          promoPrice: 199,
          badge: "SAFETY PACK"
        };
      case "Software Installation & Updates":
        return {
          title: "Software Installation & Updates",
          subtitle: "Securely install, patch and configure software",
          features: ["Driver Configuration", "Antivirus Controls", "Troubleshoot Errors", "Registry Fixes"],
          originalPrice: 1799,
          promoPrice: 349,
          badge: "TECH SPECIALIST"
        };
      case "Tally Prime":
        return {
          title: "Tally Prime & GST Accounting",
          subtitle: "Master Ledger & Bills with Lifetime Access",
          features: ["Company Ledger", "GST Invoice Billing", "P&L & Reports", "Voucher Practices"],
          originalPrice: 2499,
          promoPrice: 99,
          badge: "BEST VALUE BUNDLE"
        };
      default:
        return {
          title: "Computer Basics Learning",
          subtitle: "Kickstart your digital skills with experts",
          features: ["Practical Exercises", "Certified Trainers", "Doubt Support", "Lifetime Access"],
          originalPrice: 2499,
          promoPrice: 99,
          badge: "OFFER COURSE"
        };
    }
  };

  // Live timer tick-down for Razorpay UPI QR code
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStep === 'razorpay') {
      interval = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 674));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentStep]);

  // Format countdown seconds into MM:SS
  const formatTimer = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Interactive slider state
  const whatsappContainerRef = useRef<HTMLDivElement>(null);
  const [whatsappSliderWidth, setWhatsappSliderWidth] = useState(200);

  useEffect(() => {
    if (whatsappContainerRef.current) {
      setWhatsappSliderWidth(whatsappContainerRef.current.offsetWidth - 48);
    }
  }, []);

  // Generate math captcha challenge
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 40) + 10;
    const n2 = Math.floor(Math.random() * 9) + 2;
    const op = Math.random() > 0.5 ? "+" : "-";
    setNum1(n1);
    setNum2(n2);
    setOperator(op as "+" | "-");
    setCorrectAnswer(op === "+" ? n1 + n2 : n1 - n2);
    setUserCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!customerName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setFormError("Please enter your email ID.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError("Please enter a valid email ID.");
      return;
    }
    
    // Validate Indian mobile numbers
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber.trim())) {
      setFormError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }

    // Success! Build booking object but hold for payment
    const newBooking: Booking = {
      id: `ENR-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      serviceType: serviceType || "Computer Fundamentals",
      area: "Coimbatore",
      preferredDate: new Date().toISOString().split('T')[0], // Today
      preferredTime: "Instant Enrollment",
      status: "pending",
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: serviceType ? `Enrolled in ${serviceType}` : "General computer training inquiry"
    };

    setPendingBooking(newBooking);
    setPaymentStep('select_method');

    // Reset Form fields for future submissions
    setCustomerName("");
    setEmail("");
    setMobileNumber("");
    setServiceType("");
    generateCaptcha();
  };

  const handleResetSuccess = () => {
    setSuccessBooking(null);
    setPendingBooking(null);
    setPaymentStep('form');
  };

  const handleSimulatePayment = () => {
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      if (pendingBooking) {
        onAddBooking(pendingBooking);
        setSuccessBooking(pendingBooking);
        setPaymentStep('success');
      }
    }, 1500);
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 lg:py-16">
      
      {/* LEFT COLUMN: BRAND PROMISE & DETAILS */}
      <div className="lg:col-span-7 flex flex-col justify-center text-left text-white z-10 font-sans">
        
        {/* Dynamic Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/40 px-4 py-2 rounded-full w-fit mb-6 shadow-lg shadow-blue-500/10 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <span className="font-sans text-[11px] uppercase tracking-wider text-blue-100 font-bold">
            Learn Computer Skills From Zero Level
          </span>
        </motion.div>

        {/* Big Premium Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight"
        >
          Master Essential Computer <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300">
            Skills For Career Success 🚀
          </span>
        </motion.h1>

        {/* Detailed Explanatory Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-300 text-base md:text-lg max-w-xl leading-relaxed"
        >
          Learn MS Word, Excel, PowerPoint, Tally & Digital Basics with easy step-by-step training.
        </motion.p>

        {/* Visual Badge Row (matches the screenshot trust labels with color mixed attractive design) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 bg-slate-950/40 border border-slate-800 rounded-2xl p-4.5 max-w-xl shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest">BATCHES</p>
              <p className="font-sans text-xs font-semibold text-white">Flexible Timings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-widest">METHOD</p>
              <p className="font-sans text-xs font-semibold text-white">100% Practical</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-widest">RECOGNITION</p>
              <p className="font-sans text-xs font-semibold text-white">Course Certificate</p>
            </div>
          </div>
        </motion.div>



        {/* Dual CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 mt-6"
        >
          <a
            href="#services-section"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-bold px-4.5 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>View Course Details</span>
          </a>

          <a
            href="https://wa.me/919600123098"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-sans text-xs font-bold px-4.5 py-2.5 rounded-lg transition-all"
          >
            <span>More Details 🚀</span>
          </a>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: ENROLLMENT FORM CARD */}
      <div id="booking-form-box" className="lg:col-span-5 z-10 scroll-mt-24 flex justify-center lg:justify-end">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            layout: { type: "spring", stiffness: 300, damping: 30 },
            duration: 0.4
          }}
          className="bg-white rounded-2xl p-6 md:p-8 max-w-[390px] w-full shadow-lg border border-slate-200 relative overflow-hidden flex flex-col"
        >
          {/* Multi-step payment workflow inside the card to keep layout elegant */}
          <AnimatePresence mode="wait">
            {paymentStep === 'form' && (
              <motion.form
                key="booking-input-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center justify-between">
                    <span>Join this course</span>
                    {serviceType && (
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                        Special Promo Applied
                      </span>
                    )}
                  </h3>
                  <p className="font-sans text-[10px] text-gray-500 mt-0.5">
                    {serviceType 
                      ? `Enter your details to continue to secure payment (Rs${getCoursePrice(serviceType).toFixed(2)}).`
                      : "Enter your details to register and book your study batch."}
                  </p>
                </div>

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 text-[10px] font-sans flex items-start gap-1.5"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-0.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-gray-50 border border-gray-150 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-blue-500 font-sans"
                  />
                </div>

                {/* Mail ID */}
                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-0.5">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full bg-gray-50 border border-gray-150 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-blue-500 font-sans"
                  />
                </div>

                {/* Mobile No */}
                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-0.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full bg-gray-50 border border-gray-150 rounded-lg pl-10 pr-3 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Select Course */}
                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-0.5">
                    Select Course *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-blue-500 font-sans font-semibold"
                  >
                    <option value="">-- Choose Course --</option>
                    {COURSES_LIST.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Selected Course curriculum and price showcase */}
                <AnimatePresence mode="popLayout">
                  {serviceType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 280, 
                        damping: 24, 
                        opacity: { duration: 0.2 } 
                      }}
                      className="bg-slate-50 border border-amber-200/50 rounded-xl p-2.5 space-y-2 mt-2 overflow-hidden"
                    >
                      {(() => {
                        const details = getCourseDetails(serviceType);
                        return (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                💼
                              </div>
                              <div className="text-left">
                                <h4 className="text-[11px] font-bold text-gray-900 leading-tight">
                                  {details.title}
                                </h4>
                                <p className="text-[9px] text-gray-500 leading-tight">{details.subtitle}</p>
                              </div>
                            </div>

                            {/* Features list */}
                            <div className="grid grid-cols-2 gap-1 text-[9px] text-gray-600 font-sans pt-1 text-left">
                              {details.features.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <span className="text-emerald-500 font-bold">✓</span>
                                  <span className="truncate">{feat}</span>
                                </div>
                              ))}
                            </div>

                            {/* Attractive Infographic visual representation of Selected Course details */}
                            <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg p-2.5 text-white flex items-center justify-between shadow-xs animate-pulse-slow">
                              <div className="text-left space-y-0.5">
                                <span className="font-mono text-[7px] uppercase tracking-wider text-amber-200 font-extrabold block">
                                  {details.badge}
                                </span>
                                <h5 className="font-serif text-[11px] font-black tracking-tight leading-none">Tamil Instruction Book</h5>
                                <p className="text-[8px] opacity-90">100% Practical Exercises Included</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[8px] line-through opacity-75">Rs{details.originalPrice}</p>
                                <p className="font-mono text-xs font-black text-amber-200">Rs{details.promoPrice.toFixed(2)}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>

                {/* Join Now button customized to match exact visual yellow with black stroke or elegant layout */}
                <button
                  type="submit"
                  id="book-form-submit-btn"
                  className="w-full bg-[#FFC72C] hover:bg-[#E6B225] border-2 border-black text-black font-extrabold py-2 px-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 text-xs font-mono tracking-wider cursor-pointer mt-3"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <span className="text-sm">→</span>
                </button>
              </motion.form>
            )}

            {paymentStep === 'select_method' && (
              <motion.div
                key="booking-select-payment-method"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 text-center flex-1 flex flex-col justify-between"
              >
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-6 tracking-tight text-[#1A202C]">
                  Select Payment Method
                </h3>

                {/* High Fidelity RazorPay Option Box */}
                <button
                  type="button"
                  onClick={() => setPaymentStep('razorpay')}
                  className="w-full border border-blue-100 rounded-2xl p-6 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer group"
                >
                  {/* Combined logos styled to mimic the top pill of the Razorpay trigger */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-2xs">
                    {/* PhonePe-like circle */}
                    <div className="w-4.5 h-4.5 rounded-full bg-[#5f259f] flex items-center justify-center text-white text-[8px] font-sans font-bold">
                      P
                    </div>
                    {/* Paytm-like text */}
                    <span className="text-[10px] font-bold text-[#00baf2] tracking-tighter font-sans">
                      Pay<span className="text-[#002e6e]">tm</span>
                    </span>
                    {/* GPay logo colors */}
                    <div className="flex items-center">
                      <span className="text-[10px] font-extrabold text-[#4285F4]">G</span>
                      <span className="text-[10px] font-extrabold text-[#EA4335]">P</span>
                      <span className="text-[10px] font-extrabold text-[#FBBC05]">a</span>
                      <span className="text-[10px] font-extrabold text-[#34A853]">y</span>
                    </div>
                  </div>

                  <span className="text-base font-extrabold text-[#1A202C] group-hover:text-blue-600 transition-colors">
                    RazorPay
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStep('form')}
                  className="mt-6 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors underline underline-offset-4 cursor-pointer"
                >
                  ← Go back to edit registration
                </button>
              </motion.div>
            )}

            {paymentStep === 'razorpay' && (
              /* Immersive Razorpay Pop-up Modal representing Image 2 with extreme high-fidelity detail */
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-slate-200"
                >
                  {/* Left Column (Purple brand details container) */}
                  <div className="md:col-span-5 bg-[#5112D9] text-white p-6 flex flex-col justify-between min-h-[460px] relative">
                    <div>
                      {/* Logo & Header */}
                      <div className="flex items-center gap-2">
                        <div className="bg-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="text-[8px] font-sans font-black text-[#5f259f]">P</span>
                          <span className="text-[8px] font-sans font-black text-[#00baf2] tracking-tighter">Paytm</span>
                          <span className="text-[8px] font-sans font-black text-[#34A853]">G</span>
                        </div>
                        <span className="font-serif text-base font-extrabold tracking-tight">Coursezy</span>
                      </div>

                      {/* Price Summary */}
                      <div className="bg-white/10 border border-white/10 rounded-xl p-4 mt-6">
                        <span className="text-[9px] text-indigo-200 font-mono uppercase tracking-wider block">Price Summary</span>
                        <h3 className="text-3xl font-mono font-black mt-1">
                          ₹{(getCoursePrice(pendingBooking?.serviceType || "") * 1.03).toFixed(2)}
                        </h3>
                      </div>

                      {/* Prefilled Profile Info */}
                      <div className="bg-white/10 border border-white/10 rounded-xl p-3 mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">👤</span>
                          <span className="text-[11px] font-sans text-indigo-100">
                            Using as <span className="font-bold text-white">+91 9600123098</span>
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-200">❯</span>
                      </div>

                      {/* Offers banner */}
                      <div className="bg-white/10 border border-white/10 rounded-xl p-3 mt-3 flex items-center justify-between text-xs cursor-pointer hover:bg-white/15 transition-all">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-300 text-xs">🎟️</span>
                          <span className="text-indigo-100 text-[10px]">Offers on Amazon Pay, Paytm...</span>
                        </div>
                        <span className="text-[10px] text-indigo-200">❯</span>
                      </div>
                    </div>

                    {/* Animated Credit Card and gold coin graphic */}
                    <div className="relative h-20 mt-4 hidden md:block overflow-hidden">
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute right-4 top-2 w-6 h-6 rounded-full bg-amber-400 border border-amber-300 shadow-md flex items-center justify-center text-[9px] font-bold text-amber-950"
                      >
                        ₹
                      </motion.div>
                      <div className="absolute left-4 bottom-0 w-28 h-16 bg-gradient-to-tr from-rose-400 to-amber-300 rounded-lg p-2 shadow-md border border-white/10 rotate-[-4deg]">
                        <div className="w-5 h-3 bg-slate-800/20 rounded-xs" />
                        <div className="mt-3 font-mono text-[8px] text-white tracking-widest">•••• 3098</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-[9px] text-indigo-200/50 font-sans tracking-wide pt-4 border-t border-white/10 mt-6">
                      Secured by <span className="font-extrabold text-white font-mono tracking-tight text-[10px]">Razorpay</span>
                    </div>
                  </div>

                  {/* Right Column (Interactive options layout) */}
                  <div className="md:col-span-7 bg-slate-50 p-6 flex flex-col justify-between min-h-[460px] relative">
                    {isProcessingPayment && (
                      <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center text-center p-4">
                        <RefreshCw className="w-8 h-8 text-[#5112D9] animate-spin mb-3" />
                        <h4 className="font-serif text-sm font-bold text-slate-900">Processing Secure Transaction...</h4>
                        <p className="text-[11px] text-slate-500 mt-1 font-mono">Please do not refresh or close this window.</p>
                      </div>
                    )}

                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                        <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Payment Options</h4>
                        <div className="flex items-center gap-3 text-slate-400">
                          <span className="text-xs font-bold leading-none select-none">•••</span>
                          <button 
                            type="button"
                            onClick={() => setPaymentStep('select_method')}
                            className="text-sm hover:text-slate-600 transition-colors cursor-pointer font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Main Payment Options & QR side-by-side inside the popup */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        
                        {/* Options List Column */}
                        <div className="sm:col-span-6 space-y-2">
                          {/* UPI item */}
                          <div 
                            onClick={handleSimulatePayment}
                            className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
                          >
                            <div className="text-left">
                              <span className="text-[11px] font-bold text-slate-800 block">UPI</span>
                              <span className="inline-block bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">Upto 5% cashback</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">❯</span>
                          </div>

                          {/* Cards item */}
                          <div 
                            onClick={handleSimulatePayment}
                            className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
                          >
                            <div className="text-left">
                              <span className="text-[11px] font-bold text-slate-800 block">Cards</span>
                              <span className="inline-block bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">Upto 1.5% savings...</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">❯</span>
                          </div>

                          {/* Netbanking item */}
                          <div 
                            onClick={handleSimulatePayment}
                            className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
                          >
                            <div className="text-left">
                              <span className="text-[11px] font-bold text-slate-800 block">Netbanking</span>
                              <span className="text-[8px] text-slate-400 block mt-0.5">SBI, HDFC, ICICI</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">❯</span>
                          </div>

                          {/* Wallet item */}
                          <div 
                            onClick={handleSimulatePayment}
                            className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
                          >
                            <div className="text-left">
                              <span className="text-[11px] font-bold text-slate-800 block">Wallet</span>
                              <span className="inline-block bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">Upto INR 200 bac...</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">❯</span>
                          </div>
                        </div>

                        {/* Offers & QR Code Column */}
                        <div className="sm:col-span-6 flex flex-col justify-between space-y-2">
                          {/* Available Offers Pill */}
                          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 flex items-start gap-1.5 text-left">
                            <span className="text-xs">⚡</span>
                            <div>
                              <span className="text-[8px] font-extrabold text-indigo-700 tracking-wider uppercase block">Available Offers</span>
                              <p className="text-[9px] text-slate-700 leading-tight mt-0.5">Get upto 5% cashback on super.money UPI</p>
                            </div>
                          </div>

                          {/* Interactive QR code card */}
                          <div 
                            onClick={handleSimulatePayment}
                            className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-300 hover:shadow-xs transition-all relative overflow-hidden group"
                          >
                            <div className="flex items-center justify-between w-full mb-1">
                              <span className="text-[9px] font-extrabold text-slate-700 tracking-wide uppercase">UPI QR</span>
                              <div className="flex items-center gap-1 text-rose-500 font-mono text-[9px] font-extrabold">
                                <span>⏱️</span>
                                <span>{formatTimer(qrTimer)}</span>
                              </div>
                            </div>

                            {/* Real, dynamically generated scannable UPI QR code image */}
                            <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-center relative shadow-xs group-hover:scale-105 transition-transform">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=9600123098@ybl&pn=Coursezy&am=${(getCoursePrice(pendingBooking?.serviceType || "") * 1.03).toFixed(2)}&cu=INR`)}`}
                                alt="Scannable UPI QR Code"
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <p className="text-[8px] text-slate-500 font-medium mt-1 leading-none">Scan QR with any UPI App</p>
                            
                            {/* App logos row */}
                            <div className="flex items-center gap-1 mt-1">
                              <span className="w-3.5 h-3.5 rounded-full bg-indigo-50 text-[6px] flex items-center justify-center font-bold text-[#5f259f]">P</span>
                              <span className="w-3.5 h-3.5 rounded-full bg-sky-50 text-[6px] flex items-center justify-center font-bold text-[#00baf2]">Pa</span>
                              <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-[6px] flex items-center justify-center font-bold text-[#34A853]">G</span>
                            </div>

                            <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded mt-1 leading-none">Upto 5% cashback</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Simulated CTAs & Legal Terms */}
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleSimulatePayment}
                        disabled={isProcessingPayment}
                        className="w-full bg-[#5112D9] hover:bg-[#3f0ca6] text-white font-mono text-[11px] font-bold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg hover:shadow-indigo-100"
                      >
                        <span>PAY ₹{(getCoursePrice(pendingBooking?.serviceType || "") * 1.03).toFixed(2)} NOW</span>
                        <span>→</span>
                      </button>

                      <p className="text-[8px] text-slate-400 text-center mt-3 font-sans">
                        By proceeding, I agree to Razorpay's Privacy Notice • Edit Preferences
                      </p>
                    </div>

                  </div>
                </motion.div>
              </div>
            )}

            {paymentStep === 'success' && successBooking && (
              <motion.div
                key="booking-success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4 font-sans flex flex-col items-center justify-between flex-1"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>

                <h3 className="font-serif text-lg font-bold text-gray-900">Enrollment Logged!</h3>
                <p className="font-mono text-[9px] text-blue-600 font-extrabold mt-0.5 uppercase tracking-wider">
                  ENROLLMENT ID: {successBooking.id}
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 my-4 text-left w-full space-y-1.5">
                  <p className="text-xs text-gray-600 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Student Name:</span>
                    <span className="font-semibold text-gray-900">{successBooking.customerName}</span>
                  </p>
                  <p className="text-xs text-gray-600 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Email:</span>
                    <span className="font-mono text-gray-900">{successBooking.email}</span>
                  </p>
                  <p className="text-xs text-gray-600 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Mobile No:</span>
                    <span className="font-mono font-medium text-gray-900">+91 {successBooking.mobileNumber}</span>
                  </p>
                  <p className="text-xs text-gray-600 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Selected Course:</span>
                    <span className="font-semibold text-gray-900 truncate max-w-[160px]">{successBooking.serviceType}</span>
                  </p>
                  <p className="text-xs text-gray-600 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Paid Amount:</span>
                    <span className="font-mono font-bold text-emerald-600">₹{(getCoursePrice(successBooking.serviceType || "") * 1.03).toFixed(2)}</span>
                  </p>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                  Welcome to our technical institute! A study coordinator will call or email you within 10 minutes to verify your course enrollment.
                </p>

                <button
                  type="button"
                  onClick={handleResetSuccess}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-sans text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer"
                >
                  Enroll in Another Course
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
