
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Globe, 
  Zap, 
  Code, 
  BookOpen, 
  Menu, 
  X, 
  Clock, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Monitor,
  Cpu,
  Layers
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import CourseCard from './components/CourseCard';
import AIChat from './components/AIChat';
import { Course } from './types';

// Courses Data
const COURSES: Course[] = [
  { 
    id: '1', 
    title: 'Full-Stack Neural Architect', 
    instructor: 'Dr. Aris Thorne',
    category: 'Development', 
    duration: '12 Weeks', 
    level: 'Advanced',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description: 'Master the convergence of Next.js 15, AI-integrated backends, and distributed systems. Build the next generation of scalable intelligent apps.'
  },
  { 
    id: '2', 
    title: 'Generative Design Systems', 
    instructor: 'Elena Voids',
    category: 'Design', 
    duration: '8 Weeks', 
    level: 'Intermediate',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
    description: 'Deconstruct visual boundaries using algorithmic design. Learn to create UI that adapts in real-time to user behavior and data streams.'
  },
  { 
    id: '3', 
    title: 'Quantum Computing 101', 
    instructor: 'Prof. Julian Q.',
    category: 'Tech', 
    duration: '10 Weeks', 
    level: 'Beginner',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
    description: 'Enter the era of qubits. A foundational journey through quantum gates, entanglement, and the future of supercomputing.'
  },
  { 
    id: '4', 
    title: 'Cyber-Security Sentinel', 
    instructor: 'Zero-Day Sam',
    category: 'Security', 
    duration: '14 Weeks', 
    level: 'Advanced',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1000&auto=format&fit=crop',
    description: 'Advanced offensive and defensive security strategies. Learn to protect decentralized infrastructures against sophisticated threats.'
  },
  { 
    id: '5', 
    title: 'Creative Motion Physics', 
    instructor: 'Lara Flux',
    category: 'Motion', 
    duration: '6 Weeks', 
    level: 'Intermediate',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'Master Framer Motion and Three.js to create immersive web experiences that defy traditional 2D limitations.'
  },
  { 
    id: '6', 
    title: 'AI Product Strategy', 
    instructor: 'Marcus Chen',
    category: 'Business', 
    duration: '5 Weeks', 
    level: 'Beginner',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    description: 'Bridge the gap between engineering and business. Learn to identify, validate, and launch AI-driven products in the modern market.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [intentCourse, setIntentCourse] = useState<Course | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCourse) return;
      if (e.key === 'ArrowLeft') navigateCourse('prev');
      if (e.key === 'ArrowRight') navigateCourse('next');
      if (e.key === 'Escape') setSelectedCourse(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCourse]);

  const handleEnroll = (planName: string) => {
    const phoneNumber = "7858926596";
    const courseContext = intentCourse ? `for the "${intentCourse.title}" course ` : "";
    const message = `Hi Lumina Academy! I'm interested in enrolling ${courseContext}under the ${planName}. Could you please share the admission details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateCourse = (direction: 'next' | 'prev') => {
    if (!selectedCourse) return;
    const currentIndex = COURSES.findIndex(c => c.id === selectedCourse.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % COURSES.length;
    } else {
      nextIndex = (currentIndex - 1 + COURSES.length) % COURSES.length;
    }
    setSelectedCourse(COURSES[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">LUMINA ACADEMY</div>
        
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Courses', 'Learning', 'Pricing'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('pricing')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Enroll Now
        </button>

        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          // Fixed: Cast framer-motion props to any to avoid type errors
          <motion.div
            initial={{ opacity: 0, y: -20 } as any}
            animate={{ opacity: 1, y: 0 } as any}
            exit={{ opacity: 0, y: -20 } as any}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Courses', 'Learning', 'Pricing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Fixed: Cast style object to any to allow MotionValues for non-standard CSS properties */}
        <motion.div 
          style={{ y, opacity } as any}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
          {/* Fixed: Cast initial/animate/transition props to any to avoid type errors */}
          <motion.div
            initial={{ opacity: 0, y: 20 } as any}
            animate={{ opacity: 1, y: 0 } as any}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Future-Ready Skills</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse"/>
            <span>Fall Cohort 2025</span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="ACADEMY" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
          </div>
          
          {/* Fixed: Cast initial/animate/transition props to any to avoid type errors */}
          <motion.div
             initial={{ scaleX: 0 } as any}
             animate={{ scaleX: 1 } as any}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          {/* Fixed: Cast initial/animate/transition props to any to avoid type errors */}
          <motion.p
            initial={{ opacity: 0, y: 20 } as any}
            animate={{ opacity: 1, y: 0 } as any}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Master the crafts that define tomorrow. 
            Immersive learning led by the world's leading digital architects.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          {/* Fixed: Cast animate/transition props to any to avoid type errors */}
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" } as any}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    CODE YOUR FUTURE <span className="text-black text-2xl md:text-4xl">●</span> 
                    DESIGN FOR IMPACT <span className="text-black text-2xl md:text-4xl">●</span> 
                    MASTER THE MACHINE <span className="text-black text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* COURSES SECTION */}
      <section id="courses" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Active <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Curriculum</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING FEATURES SECTION */}
      <section id="learning" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                Deep <br/> <GradientText text="IMMERSION" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                Lumina Academy isn't just about watching videos. It's about high-fidelity practice, direct industry access, and building a portfolio that commands attention.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Cpu, title: 'AI-Native Workflow', desc: 'Every lesson integrates modern AI tools to accelerate your creative throughput.' },
                  { icon: Layers, title: 'Stacked Projects', desc: 'Real-world briefs from top-tier tech companies. No more generic tutorials.' },
                  { icon: GraduationCap, title: 'Legacy Mentors', desc: 'Direct feedback from architects at OpenAI, Anthropic, and Vercel.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="High tech classroom" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10">
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-white">
                    Future Campus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-20 text-white">
               ADMISSION
             </h2>
             <p className="text-[#a8fbd3] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Choose your trajectory
               {intentCourse && (
                 <span className="block mt-2 text-white/50 text-xs lowercase">
                   enrolling for: {intentCourse.title}
                 </span>
               )}
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Core Path', price: '$299', color: 'white', accent: 'bg-white/5', perks: ['1 Full Course', 'Project Templates', 'Discord Access'] },
              { name: 'Full Access', price: '$899', color: 'teal', accent: 'bg-[#4fb7b3]/10 border-[#4fb7b3]/50', perks: ['Unlimited Courses', 'Weekly Workshops', 'Industry Certs'] },
              { name: 'Executive', price: '$2499', color: 'periwinkle', accent: 'bg-[#637ab9]/10 border-[#637ab9]/50', perks: ['1-on-1 Mentoring', 'Direct Placements', 'Lifetime Updates'] },
            ].map((plan, i) => {
              return (
                // Fixed: Cast whileHover to any to avoid type errors
                <motion.div
                  key={i}
                  whileHover={{ y: -20 } as any}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[500px] transition-colors duration-300 ${plan.accent}`}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">{plan.name}</h3>
                    <div className={`text-5xl md:text-6xl font-bold mb-8 tracking-tighter ${plan.color === 'white' ? 'text-white' : plan.color === 'teal' ? 'text-[#4fb7b3]' : 'text-[#637ab9]'}`}>
                      {plan.price}
                    </div>
                    <ul className="space-y-4 text-sm text-gray-200">
                      {plan.perks.map((perk, pi) => (
                        <li key={pi} className="flex items-center gap-3">
                          <Zap className={`w-4 h-4 ${plan.color === 'white' ? 'text-white' : plan.color === 'teal' ? 'text-[#a8fbd3]' : 'text-[#637ab9]'}`} /> 
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleEnroll(plan.name)}
                    className="w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative text-white hover:bg-white hover:text-black"
                  >
                    <span className="relative z-10">
                      Apply Now
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">LUMINA ACADEMY</div>
             <p className="text-gray-400 max-w-xs text-sm">Empowering the next generation of digital pioneers through immersive technical education.</p>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">Discord</a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          // Fixed: Cast framer-motion props to any to avoid type errors
          <motion.div
            initial={{ opacity: 0 } as any}
            animate={{ opacity: 1 } as any}
            exit={{ opacity: 0 } as any}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            {/* Fixed: Cast initial/animate/exit props to any to avoid type errors */}
            <motion.div
              initial={{ scale: 0.9, y: 20 } as any}
              animate={{ scale: 1, y: 0 } as any}
              exit={{ scale: 0.9, y: 20 } as any}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1a1b3b] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* Fixed: Cast initial/animate/exit props to any to avoid type errors */}
                  <motion.img 
                    key={selectedCourse.id}
                    src={selectedCourse.image} 
                    alt={selectedCourse.title} 
                    initial={{ opacity: 0, scale: 1.1 } as any}
                    animate={{ opacity: 1, scale: 1 } as any}
                    exit={{ opacity: 0 } as any}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3b] via-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                {/* Fixed: Cast initial/animate props to any to avoid type errors */}
                <motion.div
                  key={selectedCourse.id}
                  initial={{ opacity: 0, x: 20 } as any}
                  animate={{ opacity: 1, x: 0 } as any}
                >
                  <div className="flex items-center gap-4 text-[#4fb7b3] mb-4">
                     <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> <span className="text-xs font-mono">{selectedCourse.duration}</span></div>
                     <div className="flex items-center gap-1"><Monitor className="w-4 h-4" /> <span className="text-xs font-mono">{selectedCourse.level}</span></div>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-tight mb-2 text-white">
                    {selectedCourse.title}
                  </h3>
                  
                  <p className="text-lg text-[#a8fbd3] font-medium tracking-widest uppercase mb-6">
                    With {selectedCourse.instructor}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedCourse.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <button 
                       onClick={() => { 
                         setIntentCourse(selectedCourse);
                         setSelectedCourse(null); 
                         scrollToSection('pricing'); 
                       }}
                       className="px-8 py-3 bg-[#4fb7b3] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                    >
                      Enroll Now
                    </button>
                    <div className="flex items-center gap-2">
                       <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                       <span className="font-bold">{selectedCourse.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
