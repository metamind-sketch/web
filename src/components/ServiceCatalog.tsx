import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShoppingCart, Heart, Sparkles, BookOpen, Layers, CreditCard, Video, UserCheck, AlertCircle, CheckCircle2, ChevronRight, X } from "lucide-react";

interface CourseItem {
  id: string;
  category: "design" | "office" | "accounting" | "tech";
  tag: string;
  title: string;
  author: string;
  rating: string;
  reviewCount: number;
  price: string;
  originalPrice: string;
  modules: string;
  bannerGradient: string;
  emoji: string;
  highlights: string[];
}

interface ServiceCatalogProps {
  onSelectServiceShortcut: (serviceName: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function ServiceCatalog({ onSelectServiceShortcut, searchQuery = "", setSearchQuery }: ServiceCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "design" | "office" | "accounting" | "tech">("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const courses: CourseItem[] = [
    {
      id: "course-fundamentals",
      category: "tech",
      tag: "Computer Fundamentals",
      title: "Computer Fundamentals Course | Complete Hardware & OS Basics",
      author: "By Coursezy",
      rating: "4.9",
      reviewCount: 148,
      price: "Rs299.00",
      originalPrice: "Rs999.00",
      modules: "5 Modules",
      bannerGradient: "from-sky-500 via-blue-600 to-indigo-500",
      emoji: "💻",
      highlights: ["Keyboard & Mouse Training", "Windows OS Navigation", "File & Folder Management", "Basic Troubleshooting"]
    },
    {
      id: "course-msoffice",
      category: "office",
      tag: "Microsoft Office",
      title: "Microsoft Office Course | Master Word, Excel & PowerPoint",
      author: "By Coursezy",
      rating: "4.8",
      reviewCount: 210,
      price: "Rs499.00",
      originalPrice: "Rs1,999.00",
      modules: "12 Modules",
      bannerGradient: "from-emerald-600 via-teal-600 to-green-500",
      emoji: "📊",
      highlights: ["MS Word Formatting", "Excel Formulas & Dashboards", "PowerPoint Presentation Slides", "Step-by-Step Tamil Practice"]
    },
    {
      id: "course-aitools",
      category: "design",
      tag: "AI Tools Basics",
      title: "AI Tools Basics | Leverage ChatGPT & Gemini for Quick Productivity",
      author: "By Coursezy",
      rating: "4.9",
      reviewCount: 125,
      price: "Rs399.00",
      originalPrice: "Rs1,499.00",
      modules: "6 Modules",
      bannerGradient: "from-purple-600 via-indigo-600 to-pink-500",
      emoji: "🤖",
      highlights: ["Prompt Engineering Secrets", "ChatGPT for Daily Writing", "Gemini for Content & Work", "AI Productivity Hacks"]
    },
    {
      id: "course-internet",
      category: "tech",
      tag: "Internet Basics",
      title: "Internet Basics Course | Web Browsing, Email & Safe Online Payments",
      author: "By Coursezy",
      rating: "4.7",
      reviewCount: 95,
      price: "Rs199.00",
      originalPrice: "Rs699.00",
      modules: "4 Modules",
      bannerGradient: "from-cyan-500 via-teal-600 to-emerald-500",
      emoji: "🌐",
      highlights: ["Secure Web Browsing", "Professional Email Writing", "Safe UPI & Card Payments", "Cloud Storage Mastery"]
    },
    {
      id: "course-software",
      category: "tech",
      tag: "Software Installation & Updates",
      title: "Software Installation & Updates | System Configuration & Setup",
      author: "By Coursezy",
      rating: "4.8",
      reviewCount: 132,
      price: "Rs349.00",
      originalPrice: "Rs1,299.00",
      modules: "5 Modules",
      bannerGradient: "from-slate-700 via-slate-800 to-blue-900",
      emoji: "⚙️",
      highlights: ["Secure Program Installs", "Driver & Windows Updates", "Antivirus & Security Setup", "System Speed Optimization"]
    },
    {
      id: "course-tally",
      category: "accounting",
      tag: "Tally Prime",
      title: "Tally Prime & GST Accounting | Complete Ledger & Bills Course",
      author: "By Coursezy",
      rating: "4.9",
      reviewCount: 185,
      price: "Rs599.00",
      originalPrice: "Rs2,499.00",
      modules: "8 Modules",
      bannerGradient: "from-rose-500 via-orange-500 to-amber-500",
      emoji: "💼",
      highlights: ["Company Ledger Creation", "GST & Billing Invoices", "P&L Statements & Reports", "Voucher Entry Practices"]
    }
  ];

  const filteredCourses = courses.filter(c => {
    const matchesCategory = activeCategory === "all" || c.category === activeCategory;
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.highlights.some(hl => hl.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "tech", label: "Computer Basics" },
    { id: "office", label: "MS Office" },
    { id: "accounting", label: "Tally Prime" },
    { id: "design", label: "AI Tools Basics" }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
    const item = courses.find(c => c.id === id);
    if (item) {
      const isFav = !favorites.includes(id);
      showToast(isFav ? `❤️ Added "${item.tag}" to your favorites!` : `Removed "${item.tag}" from favorites.`);
    }
  };

  const handleAddToCart = (tag: string) => {
    setCartCount(prev => prev + 1);
    showToast(`🛒 "${tag}" course added to your cart successfully!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <section className="py-12 md:py-18 relative scroll-mt-20" id="services-section">
      
      {/* Floating Interactive Cart & Toast Status */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-sans text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4">
        {/* Course Catalog Title & Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>Explore Courses</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 font-semibold tracking-tight">
              Our Professional Computer Courses
            </h2>
            <p className="font-sans text-xs text-gray-500 mt-1 max-w-xl">
              Easy, step-by-step practical training in Tamil. Get lifelong access and fully recognized digital certifications.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-150 w-fit self-start lg:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Layout matching course catalog models */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl p-8 max-w-md mx-auto shadow-xs border border-gray-150">
            <span className="text-3xl">🔍</span>
            <h4 className="font-serif text-base font-semibold text-gray-900 mt-2">No Courses Found</h4>
            <p className="font-sans text-xs text-gray-500 mt-1">We couldn't find any courses matching "{searchQuery}". Try a different keyword!</p>
            {setSearchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold px-4 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const isFavorited = favorites.includes(course.id);
              return (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -3 }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  className="bg-white rounded-2xl p-3.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 relative group border border-slate-100"
                >
                  
                  {/* Thumbnail Banner Area (Clean, Neat & Solid Gradient) */}
                  <div className={`aspect-video w-full rounded-xl bg-gradient-to-br ${course.bannerGradient} relative overflow-hidden flex flex-col justify-between p-3.5 mb-3 shadow-inner`}>
                    
                    {/* Logo Floating & heart block */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="bg-white/15 border border-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <span className="text-base leading-none">{course.emoji}</span>
                        <span className="font-sans text-[10px] font-bold text-white tracking-wide">{course.tag}</span>
                      </div>
                      
                      {/* Heart Button inside white circle */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(course.id); }}
                        className="w-7 h-7 rounded-full bg-white/95 shadow-xs flex items-center justify-center hover:scale-105 transition-all cursor-pointer group-hover:bg-white"
                        title="Add to Favorites"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${isFavorited ? "text-rose-500 fill-rose-500" : "text-gray-400 group-hover:text-rose-500"}`} />
                      </button>
                    </div>
 
                    {/* Styled Banner Content text overlay */}
                    <div className="relative z-10 text-left">
                      <p className="font-mono text-[8px] text-amber-300 uppercase tracking-widest font-extrabold leading-none mb-1">Coimbatore No.1</p>
                      <h4 className="font-serif text-lg md:text-xl font-black text-white leading-tight drop-shadow-sm tracking-tight">
                        {course.tag} Mastery
                      </h4>
                      <p className="font-sans text-[9px] text-white/80 font-medium tracking-wide mt-1 flex items-center gap-1">
                        <span className="bg-amber-400 text-slate-900 font-extrabold px-1 rounded-xs uppercase text-[8px]">{course.modules}</span>
                        <span>Basic to Advanced in Tamil</span>
                      </p>
                    </div>
                  </div>

                  {/* Below Thumbnail Info */}
                  <div>
                    {/* Tag badge & Rating */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {course.tag}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-gray-300 font-normal">({course.reviewCount})</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-sans text-[13px] font-bold text-slate-900 leading-snug line-clamp-2 h-9 mb-1 text-left">
                      {course.title}
                    </h3>

                    {/* Author */}
                    <p className="font-sans text-[11px] text-slate-400 font-medium text-left mb-3">
                      {course.author}
                    </p>

                    {/* Highlights checkmark boxes */}
                    <div className="space-y-1 mb-4 pt-2.5 border-t border-slate-100">
                      {course.highlights.slice(0, 3).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-1.5 text-[10.5px] text-slate-600 font-sans text-left">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Row (Join Now, Cart, Price) */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                    
                    {/* Join Now / Register Shortcut */}
                    <button
                      onClick={() => onSelectServiceShortcut(course.tag + " Course")}
                      id={`book-shortcut-${course.id}`}
                      className="inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-500 text-slate-900 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs shadow-amber-400/5 hover:-translate-y-0.5"
                    >
                      <span>Join Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Cart Icon & Price Display */}
                    <div className="flex items-center gap-2.5">
                      {/* Shopping Cart button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(course.tag)}
                        className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/70 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-all cursor-pointer"
                        title="Add Course to Cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>

                      {/* Prices with original strikethrough */}
                      <div className="text-right">
                        <p className="font-sans text-[13px] font-extrabold text-indigo-600 leading-none">{course.price}</p>
                        <p className="font-sans text-[9px] text-slate-400 line-through mt-0.5">{course.originalPrice}</p>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}
      </div>

    </section>
  );
}
