import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase } from './supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  FileText,
  Wallet,
  BookOpen,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Zap,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  HelpCircle,
  Plus,
  Trophy,
  ClipboardCheck
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// --- Constants & Styles ---
const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid student email address."),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

// --- Components ---

const Navbar = ({ onScrollToWaitlist }: { onScrollToWaitlist: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#006837] rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tight">
            UoE <span className="text-[#006837]">Next</span>
          </span>
        </div>
        <button
          onClick={onScrollToWaitlist}
          className="bg-[#006837] text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:shadow-lg hover:shadow-green-900/20 transition-all active:scale-95 flex items-center gap-2"
        >
          Secure Early Access <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

const FeatureCard = ({ title, description, icon: Icon, className = "", delay = 0, isDark = false, image = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`p-8 rounded-[3rem] ${isDark ? 'bg-slate-900 text-white border-white/5' : 'glass border-slate-100 shadow-sm'} border relative overflow-hidden group ${className}`}
  >
    {image && (
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
        <img src={image} alt="" className="w-full h-full object-cover object-left" />
      </div>
    )}
    <div className="relative z-10">
      <div className={`mb-6 p-4 w-fit rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
        <Icon className={`w-8 h-8 ${isDark ? 'text-white' : 'text-[#006837]'}`} />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed text-sm`}>{description}</p>
    </div>
  </motion.div>
);

const DashboardGallery = () => {
  const modules = [
    {
      id: 'dashboard',
      title: 'Main Dashboard',
      icon: LayoutGrid,
      img: '/dashboard.png'
    },
    {
      id: 'tutor',
      title: 'AI Smart Tutor',
      icon: Brain,
      img: '/ai_tutor.png'
    },
    {
      id: 'finance',
      title: 'Finance Center',
      icon: Wallet,
      img: '/finance.png'
    },
    {
      id: 'scheduler',
      title: 'Academic Scheduler',
      icon: Calendar,
      img: '/timetable.png'
    },
    {
      id: 'transcript',
      title: 'Transcripts',
      icon: FileText,
      img: '/transcripts.png'
    },
    {
      id: 'registration',
      title: 'Course Registration',
      icon: ClipboardCheck,
      img: '/course_registration.png'
    },
    {
      id: 'messages',
      title: 'Messaging',
      icon: MessageSquare,
      img: '/messages.png'
    },
    {
      id: 'repository',
      title: 'Repository',
      icon: BookOpen,
      img: '/repository.png'
    },
    {
      id: 'academic',
      title: 'Academic Hub',
      icon: GraduationCap,
      img: '/academic.png'
    },
    {
      id: 'news',
      title: 'News & Events',
      icon: Trophy,
      img: '/newsevents.png'
    },
  ];

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Explore the Next-Gen Dashboard</h2>
          <p className="text-slate-500 font-medium">A unified, high-performance experience for every UoE student.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeTab === m.id
                ? 'bg-[#006837] text-white shadow-xl shadow-green-900/20'
                : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-100'
                }`}
            >
              <m.icon className="w-4 h-4" />
              {m.title}
            </button>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="w-full aspect-[3/4] md:aspect-[16/10] glass border-slate-200 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden p-3 md:p-6"
            >
              <div className="w-full h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-200 relative group">
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={modules.find(m => m.id === activeTab)?.img}
                  alt={`${modules.find(m => m.id === activeTab)?.title} Module Preview`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decorative Background Elements */}
          <div className="absolute -z-10 -top-12 -left-12 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full" />
          <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

const SuccessToast = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border border-white/10"
  >
    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
      <CheckCircle2 className="w-6 h-6 text-white" />
    </div>
    <div>
      <div className="font-black text-sm uppercase tracking-wider">Welcome to the List</div>
      <div className="text-slate-400 text-xs">We've reserved your spot for the early access launch.</div>
    </div>
    <button onClick={onClose} className="ml-4 text-slate-500 hover:text-white text-xl">
      &times;
    </button>
  </motion.div>
);

const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
    const input = document.getElementById('waitlist-email');
    if (input) input.focus();
  };

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{
          email: data.email,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error: any) {
      console.error('Waitlist error:', error.message);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative selection:bg-[#006837]/20">
      <Navbar onScrollToWaitlist={scrollToWaitlist} />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-8 text-[#006837] font-black text-xs tracking-[0.25em] uppercase bg-[#006837]/5 w-fit px-5 py-2 rounded-full border border-[#006837]/10">
                <Sparkles className="w-4 h-4" />
                UoE Next Generation
              </div>
              <h1 className="text-6xl lg:text-8xl font-black leading-[1] mb-8 text-slate-900 tracking-tighter">
                The Future of Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006837] to-[#F2AF13]">
                  Academic Journey
                </span> <br />
                Starts Today.
              </h1>
              <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                Ditch the old ways. Experience the all-new UoE Student Portal—AI-powered, blockchain-verified, and built for your success.
              </p>

              {/* Waitlist Form */}
              <div ref={waitlistRef}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-lg">
                  <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/10 border border-slate-100 ring-1 ring-slate-900/5">
                    <input
                      {...register("email")}
                      id="waitlist-email"
                      type="email"
                      placeholder="student@uoeld.ac.ke"
                      className="flex-1 bg-transparent px-8 py-5 outline-none text-slate-900 font-bold placeholder:text-slate-300 text-lg"
                    />
                    <button
                      disabled={isSubmitting}
                      className="bg-[#006837] text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#005a2f] transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Join Waitlist <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                  {errors.email && (
                    <p className="mt-4 ml-8 text-red-500 text-sm font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      {errors.email.message}
                    </p>
                  )}
                </form>
              </div>

              {/* Stats / Social Proof */}
              <div className="mt-16 flex flex-wrap gap-12">
                <div>
                  <div className="text-3xl font-black text-[#006837]">500+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Students Joined</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#F2AF13]">100%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Secure & Verified</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">0.02s</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Instant Response</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square bg-transparent rounded-[5rem] overflow-hidden shadow-2xl relative group border-8 border-white/20">
                <img
                  src="/ai_hero.png"
                  alt="UoE Next AI Assistant Illustration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006837]/40 to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 left-12 glass p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl"
                >
                  <Brain className="text-[#006837] w-8 h-8 mb-4" />
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Recommendation</div>
                  <div className="text-xs font-black text-slate-800">Optimize Study Plan</div>
                </motion.div>
              </div>

              {/* Floating Graduation Hat */}
              <motion.div
                animate={{ rotate: [0, 5, 0], y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-full shadow-2xl border border-slate-50"
              >
                <Trophy className="w-10 h-10 text-amber-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="AI Smart Tutor"
            description="Personalized academic assistance available 24/7. Get complex concepts broken down into simple summaries instantly."
            icon={Brain}
            image="/ai_tutor.png"
            className="md:col-span-2 md:row-span-1"
            delay={0.1}
          />
          <FeatureCard
            title="Secure Finance"
            description="Manage your fee payments and track your balance in real-time with zero friction."
            icon={Wallet}
            image="/finance.png"
            delay={0.2}
          />
          <FeatureCard
            title="Verified Transcripts"
            description="Blockchain-backed digital records that are instantly shareable and employer-verified."
            icon={FileText}
            image="/transcripts.png"
            delay={0.3}
            isDark
          />
          <FeatureCard
            title="Academic Hub"
            description="Unified view of your timetable, registration, and announcements in a single slick interface."
            icon={LayoutGrid}
            image="/academic.png"
            className="md:col-span-2"
            delay={0.4}
          />
        </div>
      </section>

      {/* Dynamic Gallery */}
      <DashboardGallery />

      {/* Trust Section */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <div className="bg-[#006837] p-16 md:p-24 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-green-900/30">
          <div className="relative z-10">
            <ShieldCheck className="w-20 h-20 text-[#F2AF13] mx-auto mb-10" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Secured by Excellence.</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12 font-medium">
              We leverage advanced encryption and university-standard security protocols to ensure your academic and personal data is always protected.
            </p>
            <div className="flex flex-wrap justify-center gap-10 grayscale opacity-40">
              <div className="font-black text-xl tracking-tighter">UNIVERSITY STANDARDS</div>
              <div className="font-black text-xl tracking-tighter">256-BIT ENCRYPTION</div>
              <div className="font-black text-xl tracking-tighter">DATA PRIVACY FIRST</div>
            </div>
          </div>

          {/* Background Mesh */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]" />
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-slate-100 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#006837] rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-xl">UoE <span className="text-[#006837]">Next</span></span>
          </div>
          <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-900 transition-colors">UoE Main Site</a>
          </div>
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2024 University of Eldoret Portal v4.0
          </div>
        </div>
      </footer>

      {/* Success Notification */}
      <AnimatePresence>
        {isSuccess && <SuccessToast onClose={() => setIsSuccess(false)} />}
      </AnimatePresence>

      {/* Floating Action */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="fixed bottom-8 right-8 z-50 bg-[#006837] text-white p-5 rounded-full shadow-2xl cursor-pointer"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.div>
    </div>
  );
};

// --- Initial Render ---
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
