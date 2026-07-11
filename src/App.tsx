/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Settings, 
  Wrench, 
  RefreshCw, 
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  BookmarkCheck,
  CheckCircle,
  Menu,
  X,
  Search,
  MessageCircle
} from "lucide-react";
import { Booking, BlobColor } from "./types";
import BlobBackground from "./components/BlobBackground";
import FixMyPcHero from "./components/FixMyPcHero";
import WhyChooseUs from "./components/WhyChooseUs";
import ServiceCatalog from "./components/ServiceCatalog";
import FAQSection from "./components/FAQSection";
import AdminPanel from "./components/AdminPanel";
import FloatingCardsDecoration from "./components/FloatingCardsDecoration";

// Style presets for the ambient blobs
const THEME_PRESETS: BlobColor[] = [
  {
    id: "coimbatore-byte",
    name: "Coimbatore Byte",
    color1: "bg-blue-500/15",
    color2: "bg-cyan-400/20",
    color3: "bg-indigo-400/15"
  },
  {
    id: "silicon-glow",
    name: "Silicon Glow",
    color1: "bg-orange-500/15",
    color2: "bg-rose-400/20",
    color3: "bg-amber-400/15"
  },
  {
    id: "aurora-cyber",
    name: "Aurora Cyber",
    color1: "bg-emerald-500/15",
    color2: "bg-teal-400/20",
    color3: "bg-cyan-400/15"
  }
];

const DROPDOWN_COURSES = [
  { name: "Computer Fundamentals", tag: "Computer Fundamentals" },
  { name: "Microsoft Office (Word, Excel & PowerPoint)", tag: "Microsoft Office" },
  { name: "AI Tools Basics (ChatGPT & Gemini)", tag: "AI Tools Basics" },
  { name: "Internet Basics", tag: "Internet Basics" },
  { name: "Software Installation & Updates", tag: "Software Installation & Updates" },
  { name: "Tally Prime", tag: "Tally Prime" }
];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<BlobColor>(THEME_PRESETS[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  // Prefilled Service Selector State (from Service catalog shortcuts to Hero form)
  const [prefilledService, setPrefilledService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Stateful persistent bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("fixmypc_bookings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing bookings:", e);
      }
    }
    // Pre-seeded high-quality dummy data
    const initial: Booking[] = [
      {
        id: "PC-583021",
        customerName: "Ramesh Kumar",
        mobileNumber: "9876543210",
        serviceType: "Hardware Repair & Diagnostics",
        area: "RS Puram",
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        preferredTime: "Morning (8:00 AM - 12:00 PM)",
        status: "pending",
        createdAt: "02:04 PM",
        notes: "Computer boots to BIOS screen but doesn't detect the bootable operating system drive."
      },
      {
        id: "PC-912048",
        customerName: "Priya Chandran",
        mobileNumber: "9442381273",
        serviceType: "SSD & RAM Upgrades",
        area: "Peelamedu",
        preferredDate: new Date().toISOString().split('T')[0], // Today
        preferredTime: "Afternoon (12:00 PM - 4:00 PM)",
        status: "confirmed",
        createdAt: "11:15 AM",
        notes: "Need extra 1TB NVMe M.2 SSD installed in laptop with data clone for video editing."
      },
      {
        id: "PC-112049",
        customerName: "Suresh Vignesh",
        mobileNumber: "9789043221",
        serviceType: "Custom PC Building & Setup",
        area: "Gandhipuram",
        preferredDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        preferredTime: "Evening (4:00 PM - 8:00 PM)",
        status: "completed",
        createdAt: "09:30 AM",
        notes: "Newly purchased Ryzen 9 parts assembly with fluid water cooling. Needs XMP and BIOS tuning."
      }
    ];
    localStorage.setItem("fixmypc_bookings", JSON.stringify(initial));
    return initial;
  });

  // Keep localStorage updated when state changes
  useEffect(() => {
    localStorage.setItem("fixmypc_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Operations handlers
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(`Are you sure you want to delete log ${id}?`)) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  // Shortcut binder
  const handleSelectServiceShortcut = (serviceName: string) => {
    // If name contains 'Course', normalize it (e.g. 'Tally Prime Course' to 'Tally Prime')
    let normalized = serviceName.replace(" Course", "");
    setPrefilledService(normalized);
    
    // Smooth scroll directly to the Booking Form
    const element = document.getElementById("booking-form-box");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-gray-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Decorative Floating Cards on the far sides and bottom of the page */}
      <FloatingCardsDecoration />

      {/* -------------------- 1. HERO SECTION: RICH DARK IMAGE THEME -------------------- */}
      <div className="relative bg-slate-900 overflow-hidden pb-16 lg:pb-24 border-b border-slate-800">
        
        {/* Professional Educational Student Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <img 
            src="/src/assets/images/students_learning_hero_bg_1783749841839.jpg" 
            alt="Students Learning Together Background" 
            className="w-full h-full object-cover object-center opacity-85 scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Elegant rich dark gradient overlay to make image highly visible and text extremely legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/50 to-slate-950/70" />
        </div>

        {/* Dynamic ambient grid overlay - extremely subtle dark gray */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

        {/* Top Navbar Header */}
        <header className="relative w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-40">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white block leading-none">
                MetaMinds
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-slate-300 uppercase">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            
            {/* Courses Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button 
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-hidden uppercase text-slate-300 font-mono text-xs font-semibold"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: coursesDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              
              <AnimatePresence>
                {coursesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl p-2 z-50 text-left backdrop-blur-md"
                  >
                    <div className="text-[9px] text-blue-400 font-mono tracking-widest uppercase mb-1.5 px-3 pt-2">Academy Course Programs</div>
                    <div className="space-y-0.5">
                      {DROPDOWN_COURSES.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleSelectServiceShortcut(c.tag + " Course");
                            const sSection = document.getElementById("services-section");
                            if (sSection) {
                              sSection.scrollIntoView({ behavior: "smooth" });
                            }
                            setCoursesDropdownOpen(false);
                          }}
                          className="w-full text-left font-sans text-[11.5px] text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-xl transition-all flex items-center gap-2 group cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#why-choose-us" className="hover:text-white transition-colors">About Us</a>
            <a href="#faq-section" className="hover:text-white transition-colors">FAQs</a>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Right Action Badge - Now a Search option */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative flex items-center bg-white/10 border border-white/10 rounded-full px-3.5 py-1.5 focus-within:border-blue-400/50 transition-all shadow-inner backdrop-blur-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const sSection = document.getElementById("services-section");
                  if (sSection) {
                    sSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-transparent border-none text-white placeholder-gray-500 focus:outline-hidden font-sans text-xs w-44"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-white ml-1 bg-white/10 hover:bg-white/25 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden relative bg-slate-950 border-b border-white/5 text-white z-40 px-6 py-4 space-y-3"
            >
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium py-1.5 text-slate-300 hover:text-white"
              >
                Home
              </a>
              
              {/* Courses Accordion */}
              <div>
                <button
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="w-full text-left text-sm font-medium py-1.5 text-slate-300 hover:text-white flex items-center justify-between"
                >
                  <span>Courses</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: mobileCoursesOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                
                {mobileCoursesOpen && (
                  <div className="pl-4 mt-1 space-y-2 border-l border-white/10 ml-1">
                    {DROPDOWN_COURSES.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleSelectServiceShortcut(c.tag + " Course");
                          const sSection = document.getElementById("services-section");
                          if (sSection) {
                            sSection.scrollIntoView({ behavior: "smooth" });
                          }
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-xs text-slate-400 hover:text-white py-1 transition-all"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a 
                href="#why-choose-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium py-1.5 text-slate-300 hover:text-white"
              >
                About Us
              </a>
              <a 
                href="#faq-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium py-1.5 text-slate-300 hover:text-white"
              >
                FAQs
              </a>
              {/* Mobile Search bar */}
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-blue-400/50 transition-all mt-1">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    const sSection = document.getElementById("services-section");
                    if (sSection) {
                      sSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-transparent border-none text-white placeholder-gray-500 focus:outline-hidden font-sans text-sm w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-white ml-1 bg-white/10 hover:bg-white/25 rounded-full p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Hero Layout */}
        <main className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-8 md:mt-12">
          {/* We hook setBookings directly to log new bookings securely */}
          <FixMyPcHero 
            onAddBooking={handleAddBooking} 
            bookingCount={bookings.filter(b => b.status === "pending").length} 
            prefilledService={prefilledService}
          />
        </main>
      </div>

      {/* -------------------- 2. WHY CHOOSE US: LIGHT SECTION -------------------- */}
      <div id="why-choose-us" className="scroll-mt-20">
        <WhyChooseUs />
      </div>

      {/* -------------------- 3. SERVICES SECTION: LIGHT SECTION WITH SHORTCUTS -------------------- */}
      <div className="bg-[#F4F7F9]/40 border-y border-gray-150">
        <ServiceCatalog 
          onSelectServiceShortcut={handleSelectServiceShortcut} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* -------------------- 4. FAQS SECTION: LIGHT SECTION -------------------- */}
      <div id="faq-section" className="scroll-mt-20">
        <FAQSection />
      </div>

      {/* Floating WhatsApp Chat Widget (Connected to 9600123098) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none">
        <motion.a
          href="https://wa.me/919600123098"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-bold px-4.5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -2 }}
        >
          {/* Pulsating background ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 group-hover:animate-ping pointer-events-none" />
          
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="tracking-wide">Chat on WhatsApp</span>
          
          {/* Subtle online notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 border border-white animate-pulse" />
        </motion.a>
      </div>

    </div>
  );
}
