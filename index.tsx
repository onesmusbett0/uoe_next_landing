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
  ClipboardCheck,
  X,
  ChevronDown,
  Lock,
  AlertTriangle,
  Star,
  QrCode,
  Cpu,
  Database,
  PenLine,
  Send,
  Clock,
  Bell,
  XCircle,
  Users
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// ─── Constants & Schemas ───────────────────────────────────────────────────────

const MAROON = '#7a1a1a';
const TAN = '#9b7642';
const AMBER = '#c8902a';

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid student email address.'),
  oldPortalIssues: z.array(z.string()).optional(),
  newPortalLikes: z.array(z.string()).optional(),
  sentiment: z.string().optional(),
  opinion: z.string().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = ({ onScrollToWaitlist }: { onScrollToWaitlist: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: MAROON }}>
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tight">
            UoE <span style={{ color: MAROON }}>Next</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border" style={{ color: TAN, borderColor: `${TAN}40`, background: `${TAN}10` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: TAN }}></span>
            v4.7 Live
          </span>
          <button
            onClick={onScrollToWaitlist}
            className="text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            style={{ background: MAROON, boxShadow: `0 4px 24px ${MAROON}33` }}
          >
            Join Waitlist <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Feature Card (Bento) ─────────────────────────────────────────────────────

const FeatureCard = ({ title, description, icon: Icon, className = '', delay = 0, isDark = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`p-8 rounded-[3rem] border relative overflow-hidden group ${className}`}
    style={isDark
      ? { background: '#1a0a0a', borderColor: 'rgba(255,255,255,0.05)', color: 'white' }
      : { background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(122,26,26,0.08)', boxShadow: '0 4px 24px rgba(122,26,26,0.06)', backdropFilter: 'blur(12px)' }
    }
  >
    <div className="relative z-10">
      <div className="mb-6 p-4 w-fit rounded-2xl" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : `${MAROON}10` }}>
        <Icon className="w-8 h-8" style={{ color: isDark ? '#d4a56a' : MAROON }} />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="leading-relaxed text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#64748b' }}>{description}</p>
    </div>
    {/* Hover glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[3rem]" style={{ background: `radial-gradient(circle at 70% 30%, ${MAROON}10, transparent 70%)` }} />
  </motion.div>
);

// ─── Dashboard Gallery ────────────────────────────────────────────────────────

const DashboardGallery = () => {
  const modules = [
    { id: 'dashboard', title: 'Main Dashboard', icon: LayoutGrid, img: '/dashboard.png', mobileImg: '/dashboard_mobile.png' },
    { id: 'tutor', title: 'AI Smart Tutor', icon: Brain, img: '/ai_tutor.png', mobileImg: '/ai_tutor_mobile.png' },
    { id: 'finance', title: 'Finance Center', icon: Wallet, img: '/finance.png', mobileImg: '/finance_mobile.png' },
    { id: 'scheduler', title: 'Scheduler', icon: Calendar, img: '/timetable.png', mobileImg: '/timetable_mobile.png' },
    { id: 'transcript', title: 'Transcripts', icon: FileText, img: '/transcripts.png', mobileImg: '/transcripts_mobile.png' },
    { id: 'registration', title: 'Registration', icon: ClipboardCheck, img: '/course_registration.png', mobileImg: '/course_registration_mobile.png' },
    { id: 'messages', title: 'Messaging', icon: MessageSquare, img: '/messages.png', mobileImg: '/messages_mobile.png' },
    { id: 'repository', title: 'Repository', icon: BookOpen, img: '/repository.png', mobileImg: '/repository_mobile.png' },
    { id: 'academic', title: 'Academic Hub', icon: GraduationCap, img: '/academic.png', mobileImg: '/academic_mobile.png' },
    { id: 'news', title: 'News & Events', icon: Trophy, img: '/newsevents.png', mobileImg: '/newsevents_mobile.png' },
    { id: 'complaints', title: 'Support Tickets', icon: HelpCircle, img: '/complaints.png', mobileImg: '/complaints_mobile.png' },
  ];

  const [activeTab, setActiveTab] = useState('dashboard');
  const active = modules.find(m => m.id === activeTab)!;

  return (
    <section className="py-24 px-6 border-y" style={{ background: 'rgba(122,26,26,0.02)', borderColor: 'rgba(122,26,26,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Explore Every Module</h2>
          <p className="font-medium" style={{ color: '#94a3b8' }}>A unified, high-performance experience — on every device.</p>
        </div>

        {/* Module tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all"
              style={activeTab === m.id
                ? { background: MAROON, color: 'white', boxShadow: `0 4px 20px ${MAROON}40` }
                : { background: 'white', color: '#94a3b8', border: '1px solid #f1f5f9' }
              }
            >
              <m.icon className="w-4 h-4" />
              {m.title}
            </button>
          ))}
        </div>

        {/* Preview area */}
        <div className="relative max-w-6xl mx-auto md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'circOut' }}
              className="flex flex-col md:flex-row gap-6 md:gap-10 h-full items-stretch"
            >
              {/* ── Desktop screenshot ── */}
              <div
                className="flex-[3] min-w-0 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border relative flex flex-col bg-slate-50"
                style={{ borderColor: 'rgba(122,26,26,0.1)' }}
              >
                {/* browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200 bg-white flex-shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4 h-6 rounded-full bg-slate-100 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                    portal.uoeld.ac.ke
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <img
                    src={active.img}
                    alt={`${active.title} Desktop`}
                    className="w-full h-full object-contain block"
                  />
                </div>
              </div>

              {/* ── Mobile screenshot in a phone frame ── */}
              {active.mobileImg && (
                <div className="hidden md:flex flex-col items-center flex-1 h-full min-w-[200px] max-w-[280px]">
                  {/* phone shell */}
                  <div
                    className="relative flex-1 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] w-full flex flex-col bg-[#1e293b]"
                    style={{ borderColor: '#1e293b' }}
                  >
                    {/* notch */}
                    <div className="flex justify-center pt-3 pb-2 flex-shrink-0 bg-[#1e293b]">
                      <div className="w-16 h-1.5 rounded-full bg-slate-700" />
                    </div>
                    {/* screen */}
                    <div className="flex-1 overflow-hidden rounded-b-[2rem]">
                      <img
                        src={active.mobileImg}
                        alt={`${active.title} Mobile`}
                        className="w-full h-full object-contain block"
                      />
                    </div>
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Core Mobile Experience</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Decorative blobs */}
          <div className="absolute -z-10 -top-12 -left-12 w-64 h-64 rounded-full blur-[100px]" style={{ background: `${MAROON}15` }} />
          <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 rounded-full blur-[100px]" style={{ background: `${TAN}20` }} />
        </div>
      </div>
    </section>
  );
};



// ─── Portal Comparison Section ────────────────────────────────────────────────

const ComparisonSection = () => {
  const issues = [
    { old: 'Incorrect fee calculations & balances', new: 'Real-time itemized fee ledger with 100% accuracy' },
    { old: 'No official transcript generation', new: 'Instant QR-verified PDF transcripts with cryptographic seals' },
    { old: 'No exam card issuance', new: 'Automated exam card generation with clearance verification' },
    { old: 'No timetable generation', new: 'Dynamic AI-powered conflict-free scheduling' },
    { old: 'No email notifications', new: 'Multi-channel alerts for fees, results & announcements' },
    { old: 'No notes sharing or repository', new: 'Hierarchical cohort-based knowledge repository' },
    { old: 'No AI study tools', new: 'AI Architect: PDF extraction, quizzes, flashcards & summaries' },
    { old: 'Poor messaging platform', new: 'Real-time faculty-student messaging with read receipts' },
    { old: 'No AI chatbot assistant', new: 'Intelligent 24/7 AI tutor powered by Gemini' },
    { old: 'Performance issues & slow load times', new: 'Sub-second response times, optimized architecture' },
    { old: 'No cryptographic transcript verification', new: 'RSA/QR cryptography — forgery-proof official documents' },
    { old: 'Outdated, confusing UI', new: 'Modern glassmorphism UI with intuitive navigation' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full border" style={{ color: MAROON, borderColor: `${MAROON}20`, background: `${MAROON}08` }}>
            <AlertTriangle className="w-4 h-4" /> The Old Portal vs. What's New
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Why We Built UoE Next</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">The old portal failed students at every turn. We rebuilt everything from scratch.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl border" style={{ borderColor: 'rgba(122,26,26,0.12)', boxShadow: `0 32px 64px ${MAROON}18` }}>
          {/* Old Portal Column */}
          <div className="bg-slate-900 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-900/40 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="font-black text-white text-lg">Old Portal</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Legacy System</div>
              </div>
            </div>
            <div className="space-y-4">
              {issues.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
                >
                  <div className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-slate-400 text-sm font-medium leading-snug">{item.old}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Portal Column */}
          <div className="p-8 md:p-10" style={{ background: `linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 100%)` }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${MAROON}60` }}>
                <CheckCircle2 className="w-6 h-6" style={{ color: '#d4a56a' }} />
              </div>
              <div>
                <div className="font-black text-white text-lg">UoE Next Portal</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: TAN }}>v4.7 — AI-Powered</div>
              </div>
            </div>
            <div className="space-y-4">
              {issues.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: `${MAROON}18`, border: `1px solid ${MAROON}30` }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${MAROON}60` }}>
                    <CheckCircle2 className="w-3 h-3" style={{ color: '#d4a56a' }} />
                  </div>
                  <span className="text-slate-300 text-sm font-medium leading-snug">{item.new}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Feedback Form Section ────────────────────────────────────────────────────

const FeedbackSection = ({ feedbackForm, setFeedbackForm, onSubmit, isSubmitting, register, errors }) => {
  const oldPortalOptions = [
    'Incorrect fee calculations',
    'No transcript access',
    'No exam card generation',
    'No timetable system',
    'No email notifications',
    'No notes/repository',
    'No AI tools',
    'Poor messaging',
    'No AI chatbot',
    'Slow performance',
    'No transcript cryptography',
    'Confusing UI/UX',
  ];

  const newPortalLikeOptions = [
    'AI Study Tools (flashcards, quizzes)',
    'Cryptographically Verified Transcripts',
    'Real-time Fee Tracking',
    'Smart Timetable Scheduling',
    'Knowledge Repository',
    'Faculty Messaging System',
    'Exam Card Generation',
    'AI Chat Assistant',
    'Course Registration Hub',
    'Modern UI Design',
    'Fast Performance',
    'Secure & Private',
  ];

  const toggle = (key: 'oldIssues' | 'newLikes', val: string) => {
    setFeedbackForm(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val],
      };
    });
  };

  return (
    <section className="py-24 px-6" style={{ background: 'rgba(122,26,26,0.02)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full border" style={{ color: TAN, borderColor: `${TAN}30`, background: `${TAN}10` }}>
            <PenLine className="w-4 h-4" /> Your Voice Matters
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Share Your Experience</h2>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">Help us understand the pain points of the old system and what excites you about UoE Next.</p>
        </motion.div>

        <div className="rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-12" style={{ background: 'white', border: `1px solid rgba(122,26,26,0.1)`, boxShadow: `0 24px 64px ${MAROON}12` }}>

          {/* What didn't you like about the old portal */}
          <div>
            <h3 className="text-xl font-black mb-2" style={{ color: MAROON }}>What bothered you about the old portal?</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {oldPortalOptions.map(opt => {
                const checked = feedbackForm.oldIssues.includes(opt);
                return (
                  <label
                    key={opt}
                    className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all select-none"
                    style={checked
                      ? { background: '#fee2e2', border: '1.5px solid #fca5a5' }
                      : { background: '#f8fafc', border: '1.5px solid #f1f5f9' }
                    }
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle('oldIssues', opt)}
                    />
                    <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all" style={checked ? { background: '#ef4444', border: '2px solid #ef4444' } : { background: 'white', border: '2px solid #cbd5e1' }}>
                      {checked && <X className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: checked ? '#991b1b' : '#475569' }}>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="h-px" style={{ background: `${MAROON}15` }} />

          {/* What do you like about the new portal */}
          <div>
            <h3 className="text-xl font-black mb-2" style={{ color: MAROON }}>What excites you about UoE Next?</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {newPortalLikeOptions.map(opt => {
                const checked = feedbackForm.newLikes.includes(opt);
                return (
                  <label
                    key={opt}
                    className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all select-none"
                    style={checked
                      ? { background: `${MAROON}10`, border: `1.5px solid ${MAROON}40` }
                      : { background: '#f8fafc', border: '1.5px solid #f1f5f9' }
                    }
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle('newLikes', opt)}
                    />
                    <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all" style={checked ? { background: MAROON, border: `2px solid ${MAROON}` } : { background: 'white', border: '2px solid #cbd5e1' }}>
                      {checked && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: checked ? MAROON : '#475569' }}>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="h-px" style={{ background: `${MAROON}15` }} />

          {/* Overall sentiment */}
          <div>
            <h3 className="text-xl font-black mb-2" style={{ color: MAROON }}>Overall, how do you feel?</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Pick one that best describes your sentiment</p>
            <div className="flex flex-wrap gap-3">
              {['Very Excited 🎉', 'Cautiously Optimistic 🙂', 'Curious, waiting to see 👀', 'Skeptical 🤔', 'Need to see it to believe it 😐'].map(sentiment => {
                const checked = feedbackForm.sentiment === sentiment;
                return (
                  <label
                    key={sentiment}
                    className="flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer transition-all select-none font-bold text-sm"
                    style={checked
                      ? { background: MAROON, color: 'white', boxShadow: `0 4px 16px ${MAROON}40` }
                      : { background: '#f8fafc', color: '#475569', border: '1.5px solid #f1f5f9' }
                    }
                  >
                    <input
                      type="radio"
                      name="sentiment"
                      className="sr-only"
                      checked={checked}
                      onChange={() => setFeedbackForm(p => ({ ...p, sentiment }))}
                    />
                    {sentiment}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="h-px" style={{ background: `${MAROON}15` }} />

          {/* Personal opinion textarea */}
          <div>
            <h3 className="text-xl font-black mb-2" style={{ color: MAROON }}>Your Personal Opinion</h3>
            <p className="text-sm text-slate-500 mb-4 font-medium">Anything else you'd like us to know? Suggestions, concerns, features you wish existed...</p>
            <textarea
              rows={4}
              value={feedbackForm.opinion}
              onChange={e => setFeedbackForm(p => ({ ...p, opinion: e.target.value }))}
              placeholder="e.g. I really struggled with fee reconciliation every semester. I'm hoping the new portal finally fixes this once and for all..."
              className="w-full rounded-2xl p-5 text-sm font-medium resize-none outline-none transition-all"
              style={{
                background: '#f8fafc',
                border: `2px solid ${feedbackForm.opinion ? MAROON + '60' : '#e2e8f0'}`,
                color: '#1e293b',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
          <div className="h-px" style={{ background: `${MAROON}15` }} />

          {/* Email & Submit (Moved here) */}
          <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200" id="survey-email-section">
            <h3 className="text-xl font-black mb-2" style={{ color: MAROON }}>Ready to Join the Future?</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Enter your student email below to submit your feedback and secure your early access spot.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                {...register('email')}
                id="waitlist-email"
                type="email"
                placeholder="student@uoeld.ac.ke"
                className="flex-1 bg-white px-6 py-4 rounded-2xl outline-none font-bold placeholder:text-slate-400 text-lg border border-slate-200 focus:border-slate-400 transition-colors"
                style={{ color: '#1e293b' }}
              />
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                style={{ background: MAROON, boxShadow: `0 8px 24px ${MAROON}40` }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Submit & Join <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
            {errors.email && (
              <p className="mt-3 text-red-500 text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {errors.email?.message as React.ReactNode}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Features Showcase ────────────────────────────────────────────────────────

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Study Architect',
      description: 'Upload any PDF and get instant structured notes, topic summaries, auto-generated quiz questions, and smart flashcards — powered by Gemini AI.',
      badge: 'AI-Powered',
      stat: '10x faster notes',
    },
    {
      icon: Wallet,
      title: 'Financial Command Center',
      description: 'Real-time itemized fee tracking, full ledger history, clearance status, and downloadable PDF statements — all in one place.',
      badge: 'Real-time',
      stat: '0 billing errors',
    },
    {
      icon: QrCode,
      title: 'Cryptographic Transcripts',
      description: 'Official transcripts sealed with RSA cryptography and QR verification codes. Employers can verify authenticity in seconds — unforgeable by design.',
      badge: 'Forgery-Proof',
      stat: '256-bit secured',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduler',
      description: 'Conflict-free dynamic timetables for classes and exams. Intelligent resolution of scheduling overlaps across units, venues, and lecturers.',
      badge: 'AI Scheduling',
      stat: 'Zero conflicts',
    },
    {
      icon: BookOpen,
      title: 'Knowledge Repository',
      description: 'Hierarchical cohort-based system for sharing lecture slides, research notes, and past papers. AI summarizes uploaded materials automatically.',
      badge: 'Shared Learning',
      stat: '10K+ docs',
    },
    {
      icon: MessageSquare,
      title: 'Support & Sync',
      description: 'Real-time messaging between students and faculty, integrated news feed, official support tickets, and push notifications via email.',
      badge: 'Real-time',
      stat: '<1s delivery',
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full border" style={{ color: MAROON, borderColor: `${MAROON}20`, background: `${MAROON}08` }}>
            <Sparkles className="w-4 h-4" /> Core Feature Suite
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Everything You Need. One Portal.</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">Built by students, for students — with enterprise-grade security and AI at the core.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative p-8 rounded-[2.5rem] border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-default"
              style={{ background: 'white', borderColor: 'rgba(122,26,26,0.08)', boxShadow: '0 2px 16px rgba(122,26,26,0.04)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 20% 80%, ${MAROON}06, transparent 60%)` }} />
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl" style={{ background: `${MAROON}10` }}>
                  <f.icon className="w-7 h-7" style={{ color: MAROON }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: `${TAN}15`, color: TAN }}>
                  {f.badge}
                </span>
              </div>
              <h3 className="text-xl font-black mb-3">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{f.description}</p>
              <div className="text-xs font-black uppercase tracking-widest" style={{ color: MAROON }}>
                ↗ {f.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Success Toast ────────────────────────────────────────────────────────────

const SuccessToast = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border border-white/10"
    style={{ background: '#1a0a0a', boxShadow: `0 24px 48px ${MAROON}40` }}
  >
    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: MAROON }}>
      <CheckCircle2 className="w-6 h-6 text-white" />
    </div>
    <div>
      <div className="font-black text-sm uppercase tracking-wider">Welcome to the Waitlist</div>
      <div className="text-slate-400 text-xs">We've reserved your early access spot.</div>
    </div>
    <button onClick={onClose} className="ml-4 text-slate-500 hover:text-white text-xl">&times;</button>
  </motion.div>
);

// ─── Legal Modals ─────────────────────────────────────────────────────────────

const Modal = ({ title, onClose, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    style={{ background: 'rgba(10,5,5,0.8)', backdropFilter: 'blur(8px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95 }}
      className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-12"
      style={{ background: 'white', boxShadow: `0 48px 96px ${MAROON}30` }}
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-black mb-6" style={{ color: MAROON }}>{title}</h2>
      <div className="prose prose-sm text-slate-600 space-y-4 font-medium leading-relaxed">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const [feedbackForm, setFeedbackForm] = useState({
    oldIssues: [] as string[],
    newLikes: [] as string[],
    sentiment: '',
    opinion: '',
  });

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
    setTimeout(() => {
      const input = document.getElementById('waitlist-email');
      if (input) input.focus();
    }, 600);
  };

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .upsert(
          [{
            email: data.email,
            old_portal_issues: feedbackForm.oldIssues,
            new_portal_likes: feedbackForm.newLikes,
            sentiment: feedbackForm.sentiment,
            personal_opinion: feedbackForm.opinion,
            updated_at: new Date().toISOString(),
          }],
          { onConflict: 'email' }   // ← update survey fields if email exists
        );

      if (error) throw error;

      setIsSuccess(true);
      reset();
      setFeedbackForm({ oldIssues: [], newLikes: [], sentiment: '', opinion: '' });
      setTimeout(() => setIsSuccess(false), 7000);
    } catch (err: any) {
      console.error('Waitlist error:', err.message);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar onScrollToWaitlist={scrollToWaitlist} />

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full border" style={{ color: MAROON, borderColor: `${MAROON}20`, background: `${MAROON}08` }}>
                  <Sparkles className="w-4 h-4" /> UoE Next Generation
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full" style={{ color: TAN, background: `${TAN}15`, border: `1px solid ${TAN}30` }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: TAN }}></span>
                  v4.7 Live · {new Date().getFullYear()}
                </div>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black leading-[1] mb-8 text-slate-900 tracking-tighter">
                Join the Future<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${MAROON}, ${TAN})` }}>
                  of University
                </span>{' '}
                Life.
              </h1>

              <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                The Ultimate Academic Nexus — Finance, Academics, and AI-Driven Study Tools in one secure portal. No more broken systems.
              </p>

              {/* Call to Action to scroll to survey */}
              <div>
                <button
                  onClick={scrollToWaitlist}
                  className="text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 hover:shadow-2xl"
                  style={{ background: MAROON, boxShadow: `0 8px 24px ${MAROON}50` }}
                >
                  Take Survey & Secure Spot <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-16 flex flex-wrap gap-12">
                <div>
                  <div className="text-3xl font-black" style={{ color: MAROON }}>500+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Students Joined</div>
                </div>
                <div>
                  <div className="text-3xl font-black" style={{ color: TAN }}>100%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Secure & Verified</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">v4.7</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Latest Version</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
              <div className="aspect-square rounded-[5rem] overflow-hidden shadow-2xl relative group border-8 border-white/20" style={{ boxShadow: `0 32px 80px ${MAROON}30` }}>
                <img
                  src="/ai_hero.png"
                  alt="UoE Next AI Assistant"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${MAROON}60, transparent)` }} />
              </div>

              {/* Floating AI card */}
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 -left-8 glass p-5 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl"
              >
                <Brain className="w-7 h-7 mb-3" style={{ color: MAROON }} />
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Recommendation</div>
                <div className="text-xs font-black text-slate-800">Optimize Study Plan</div>
              </motion.div>

              {/* Floating trophy */}
              <motion.div
                animate={{ rotate: [0, 5, 0], y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-8 bg-white p-5 rounded-full shadow-2xl border border-slate-50"
              >
                <Trophy className="w-10 h-10" style={{ color: AMBER }} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute -z-10 top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${MAROON}08 0%, transparent 70%)` }} />
        <div className="absolute -z-10 top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${TAN}12 0%, transparent 70%)` }} />
      </section>

      {/* ── Features Showcase ─────────────────────────────────────────── */}
      <FeaturesShowcase />

      {/* ── Bento Grid ───────────────────────────────────────────────── */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="AI Smart Tutor" description="Personalized academic assistance 24/7. Instant PDF summaries, quiz generation, and flashcards powered by Gemini." icon={Brain} className="md:col-span-2" delay={0.1} />
          <FeatureCard title="Secure Finance" description="Real-time fee tracking, itemized ledger, and verified PDF statements." icon={Wallet} delay={0.2} />
          <FeatureCard title="Verified Transcripts" description="Cryptographically sealed with RSA + QR codes. Employer-verifiable in seconds. Forgery-proof by design." icon={FileText} delay={0.3} isDark />
          <FeatureCard title="Academic Hub" description="Timetable, unit registration, GPA forecasting, and exam cards — all in a unified interface." icon={LayoutGrid} className="md:col-span-2" delay={0.4} />
        </div>
      </section>

      {/* ── Dashboard Gallery ─────────────────────────────────────────── */}
      <DashboardGallery />

      {/* ── Comparison Section ────────────────────────────────────────── */}
      <ComparisonSection />

      {/* ── Feedback / Survey Section ──────────────────────────────────── */}
      <div ref={waitlistRef}>
        <FeedbackSection
          feedbackForm={feedbackForm}
          setFeedbackForm={setFeedbackForm}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          register={register}
          errors={errors}
        />
      </div>

      {/* ── Trust / Security CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <div className="p-16 md:p-24 rounded-[4rem] text-white relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(135deg, ${MAROON} 0%, #4a0e0e 100%)`, boxShadow: `0 32px 64px ${MAROON}40` }}>
          <div className="relative z-10">
            <ShieldCheck className="w-20 h-20 mx-auto mb-10" style={{ color: TAN }} />
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Secured by Excellence.</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12 font-medium">
              Advanced RSA cryptography, QR transcript verification, and university-grade security protocols ensure your academic records are never compromised.
            </p>
            <div className="flex flex-wrap justify-center gap-10 opacity-50">
              <div className="font-black text-sm tracking-tighter">RSA CRYPTOGRAPHY</div>
              <div className="font-black text-sm tracking-tighter">256-BIT ENCRYPTION</div>
              <div className="font-black text-sm tracking-tighter">QR VERIFICATION</div>
              <div className="font-black text-sm tracking-tighter">PRIVACY FIRST</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]" />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="py-20 border-t border-slate-100 px-6" style={{ background: 'rgba(122,26,26,0.02)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: MAROON }}>
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-xl">UoE <span style={{ color: MAROON }}>Next</span></span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">University of Eldoret Portal</div>
              </div>
            </div>
            <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
              <button onClick={() => setShowTerms(true)} className="hover:text-slate-900 transition-colors">Terms</button>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-slate-900 transition-colors">Privacy</button>
              <a href="https://uoeld.ac.ke" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">UoE Main Site</a>
              <a href="mailto:onesmusbett@uoeld.ac.ke" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              © {new Date().getFullYear()} University of Eldoret · UoE Next Portal v4.7
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Lead Dev: <span style={{ color: TAN }}>Onesmus Bett</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Modals ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTerms && (
          <Modal title="Terms of Service" onClose={() => setShowTerms(false)}>
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>By joining the UoE Next Portal waitlist, you agree to be contacted via email regarding early access, product updates, and launch notifications. Your data will be handled in accordance with our Privacy Policy.</p>
            <p><strong>Use of Service:</strong> This waitlist is intended for current and prospective students of the University of Eldoret. Fraudulent submissions are prohibited.</p>
            <p><strong>Data Retention:</strong> Your email and survey responses will be stored securely in our database and used only for product improvement and launch communication purposes.</p>
            <p><strong>No Guarantees:</strong> Joining the waitlist does not guarantee immediate access to the portal. Early access slots are allocated on a first-come, first-served basis.</p>
            <p><strong>Amendments:</strong> These terms may be updated at any time. Continued use of the waitlist constitutes acceptance of any changes.</p>
            <p>For inquiries, contact: <strong>onesmusbett@uoeld.ac.ke</strong></p>
          </Modal>
        )}
        {showPrivacy && (
          <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Data We Collect:</strong> We collect your email address, survey responses (old portal issues, new portal likes, sentiment, and personal opinion), and the timestamp of your submission.</p>
            <p><strong>How We Use It:</strong> Your data is used to communicate early access information, prioritize feature development based on user feedback, and improve the UoE Next Portal experience.</p>
            <p><strong>Data Storage:</strong> Your information is stored securely using Supabase (PostgreSQL) with Row Level Security enabled. We do not sell or share your personal data with third parties.</p>
            <p><strong>Your Rights:</strong> You have the right to request deletion of your data at any time by emailing us. We will process such requests within 7 business days.</p>
            <p><strong>Cookies:</strong> This waitlist page does not use tracking cookies.</p>
            <p><strong>Security:</strong> All data transmissions are encrypted via HTTPS/TLS. Survey data is anonymized for aggregate analysis.</p>
            <p>For questions or data removal requests: <strong>onesmusbett@uoeld.ac.ke</strong></p>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Success Toast ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSuccess && <SuccessToast onClose={() => setIsSuccess(false)} />}
      </AnimatePresence>

      {/* ── Floating Help Button ──────────────────────────────────────── */}
      <motion.a
        href="mailto:onesmusbett@uoeld.ac.ke"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 text-white p-5 rounded-full shadow-2xl"
        style={{ background: MAROON, boxShadow: `0 8px 32px ${MAROON}50` }}
        title="Contact Lead Dev"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

// ─── Mount ─────────────────────────────────────────────────────────────────────

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
