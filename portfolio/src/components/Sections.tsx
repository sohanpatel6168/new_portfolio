import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Database, LineChart, Server, Zap, ArrowUpRight, BarChart, BrainCircuit, Cpu, Layers, Network } from 'lucide-react';
import Globe from 'react-globe.gl';
import { SiPython } from 'react-icons/si';

export function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative pointer-events-none px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-heading font-extrabold text-7xl md:text-9xl tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
          Sohan Patel
        </h1>
        <p className="font-heading font-medium text-xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Data Analyst / Intelligence
        </p>
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center py-32 px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-cyan-400"></span>
            01 / Architecture
          </h2>
          <h3 className="font-heading font-bold text-5xl md:text-7xl text-white mb-8 leading-tight">
            Visual <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Architecture</span>
          </h3>
          <p className="font-sans text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
            I synthesize complex datasets into strategic architectures. 
            By fusing analytical rigor with design-driven insight, I build systems 
            that don't just report numbers—they narrate reality and dictate trajectory.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'Inventory Accuracy', value: '95%', icon: Database, color: 'text-cyan-400', glow: 'from-cyan-500/30 to-transparent', border: 'hover:border-cyan-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
            { title: 'Sales Growth', value: '+15%', icon: LineChart, color: 'text-purple-400', glow: 'from-purple-500/30 to-transparent', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
            { title: 'Master of CS', value: 'Algoma', icon: Server, color: 'text-pink-400', glow: 'from-pink-500/30 to-transparent', border: 'hover:border-pink-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]' },
            { title: 'Experience', value: '1+ YRS', icon: Zap, color: 'text-yellow-400', glow: 'from-yellow-500/30 to-transparent', border: 'hover:border-yellow-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: false, margin: "-10%" }}
              className={`group bg-surface/80 border border-zinc-800 p-8 flex flex-col justify-between aspect-[3/4] rounded-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden backdrop-blur-md ${item.border} ${item.shadow} cursor-default`}
            >
              {/* Animated glowing background orb */}
              <div className={`absolute -inset-full bg-gradient-to-br ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl z-0 rounded-full scale-50 group-hover:scale-150`}></div>
              
              {/* Matrix dot pattern overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3N2Zz4=')] opacity-30 group-hover:opacity-100 transition-opacity duration-700 z-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

              <div className="relative z-10 flex justify-between items-start">
                <div className={`w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${item.border} shadow-inner`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div className="text-zinc-600 font-mono text-[10px] group-hover:text-zinc-400 transition-colors tracking-widest">0{i+1}</div>
              </div>
              
              <div className="relative z-10">
                <div className="font-heading font-black text-5xl xl:text-6xl text-white mb-2 tracking-tight group-hover:scale-105 origin-left transition-transform duration-500 drop-shadow-lg">{item.value}</div>
                <div className={`font-mono text-xs uppercase tracking-widest ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>{item.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const categories = [
    { name: 'Core Data', skills: ['Python', 'SQL', 'Pandas', 'NumPy'], color: 'from-cyan-500 to-blue-500' },
    { name: 'AI & ML', skills: ['AI Models (LLMs)', 'Vibe Coding', 'AI Software Dev', 'Scikit-learn'], color: 'from-purple-500 to-pink-500' },
    { name: 'Data Stack', skills: ['PostgreSQL', 'MySQL', 'ETL Pipelines', 'Data Architecture'], color: 'from-pink-500 to-rose-500' },
    { name: 'BI & Viz', skills: ['Visualization', 'Dashboards', 'Jupyter', 'PowerBI'], color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <section id="skills" className="min-h-screen w-full flex items-center justify-center py-32 px-8">
      <div className="max-w-7xl w-full">
        <h2 className="font-mono text-purple-400 text-sm tracking-[0.3em] uppercase mb-8 text-center md:text-left flex items-center md:justify-start justify-center gap-4">
          <span className="w-8 h-px bg-purple-400 hidden md:block"></span>
          05 / Capabilities
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h3 className="font-heading font-bold text-5xl md:text-7xl text-white">
            Technical<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Inventory</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group border border-zinc-800 bg-surface/90 p-8 rounded-2xl hover:bg-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-700 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cat.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <h4 className="font-heading font-semibold text-white text-xl mb-6 tracking-wide">{cat.name}</h4>
              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="font-mono text-zinc-400 text-sm flex items-center gap-4 group-hover:text-zinc-200 transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.color}`}></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidBridge() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const initGlobe = () => {
      if (globeRef.current) {
        try {
          const controls = globeRef.current.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.5;
            globeRef.current.pointOfView({ altitude: 2 }, 4000);
            return; // Success
          }
        } catch (e) {
          // Controls not ready yet
        }
      }
      timeout = setTimeout(initGlobe, 200);
    };
    initGlobe();
    
    return () => clearTimeout(timeout);
  }, []);

  const analyticsNodes = [
    { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
    { name: 'PowerBI', icon: BarChart, color: 'text-yellow-500' },
    { name: 'SQL', icon: Database, color: 'text-cyan-400' },
    { name: 'Data Architecture', icon: Layers, color: 'text-blue-400' },
  ];

  const aiNodes = [
    { name: 'Antigravity', icon: Cpu, color: 'text-purple-400' },
    { name: 'Claude', icon: BrainCircuit, color: 'text-pink-400' },
    { name: 'LLMs', icon: Network, color: 'text-rose-400' },
    { name: 'Scikit-learn', icon: Server, color: 'text-orange-400' },
  ];

  const arcsData = useMemo(() => {
    return [...Array(25).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#06b6d4', '#a855f7', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <section className="min-h-[150vh] w-full flex items-center justify-center relative overflow-hidden py-32">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-[600px] aspect-square bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-pink-500/30 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="w-[800px] max-w-[100vw] aspect-square relative pointer-events-auto cursor-grab active:cursor-grabbing flex justify-center items-center">
           <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            width={800}
            height={800}
            atmosphereColor="#a855f7"
            atmosphereAltitude={0.25}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcsTransitionDuration={0}
          />
        </div>
      </div>
      
      <div className="max-w-7xl w-full z-10 px-8 relative h-full flex flex-col justify-center">
        <div className="text-center mb-16 md:mb-32">
          <h2 className="font-heading font-black text-5xl md:text-7xl text-white mb-6">
            Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Intelligence</span>
          </h2>
          <p className="font-sans text-zinc-400 text-lg max-w-2xl mx-auto">
            Engineered to analyze at scale. Mastering the intersection of robust data architectures and cutting-edge artificial intelligence.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-16 md:gap-0 mt-8">
          
          <div className="flex flex-col gap-6 w-full md:w-1/3 z-20">
            <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-4 pl-4 border-l border-cyan-400/30">Analytics Core</h3>
            {analyticsNodes.map((tech, i) => (
              <motion.div 
                key={tech.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: false, margin: "-10%" }}
                className="flex items-center gap-4 bg-surface/90 border border-zinc-800 p-4 rounded-xl hover:border-cyan-500/50 hover:scale-105 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700/50">
                  <tech.icon className={`w-5 h-5 ${tech.color || 'text-zinc-300'}`} />
                </div>
                <span className="font-heading font-semibold text-zinc-200">{tech.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-6 w-full md:w-1/3 items-end text-right z-20">
             <h3 className="font-mono text-purple-400 text-xs tracking-widest uppercase mb-4 pr-4 border-r border-purple-400/30">AI Engineering</h3>
             {aiNodes.map((comp, i) => (
              <motion.div 
                key={comp.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: false, margin: "-10%" }}
                className="flex items-center justify-end gap-4 bg-surface/90 border border-zinc-800 p-4 rounded-xl hover:border-purple-500/50 hover:scale-105 transition-all cursor-default w-full sm:w-auto min-w-[220px]"
              >
                <div className="flex flex-col">
                  <span className="font-heading font-semibold text-zinc-200">{comp.name}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700/50 ml-2">
                  <comp.icon className={`w-5 h-5 ${comp.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const experiences = [
    { year: '2026 - PRESENT', role: 'Consumables Department Manager', company: 'Walmart Canada', desc: 'Achieved 15% sales growth and 95% inventory accuracy. Developed metric tracking and inventory monitoring dashboards.' },
    { year: '2025 - 2026', role: 'Data Analyst', company: 'PrimeOwl Consulting Inc', desc: 'Translated business needs into clear data reports using SQL and Python. Improved workflow efficiency and decision-making for infrastructure projects.' },
    { year: '2024 - 2025', role: 'Web & Project Intern', company: 'Arth Infosoft / InfoLabz', desc: 'Developed a dynamic news aggregation web platform integrating external APIs and optimized application performance.' }
  ];

  return (
    <section id="experience" className="min-h-screen w-full flex items-center justify-center py-32 px-8">
      <div className="max-w-5xl w-full">
        <h2 className="font-mono text-pink-400 text-sm tracking-[0.3em] uppercase mb-16 text-center flex justify-center items-center gap-4">
          <span className="w-8 h-px bg-pink-400"></span>
          02 / Trajectory
          <span className="w-8 h-px bg-pink-400"></span>
        </h2>
        
        <div className="flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group relative flex flex-col md:flex-row gap-8 md:gap-16 bg-surface/90 border border-zinc-800 p-8 md:p-12 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="md:w-1/4 pt-2">
                <div className="font-mono text-zinc-500 text-xs tracking-widest py-1 px-3 border border-zinc-800 rounded-full inline-block group-hover:border-pink-500/50 group-hover:text-pink-400 transition-colors">{exp.year}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="font-heading font-bold text-3xl text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">{exp.role}</h3>
                <h4 className="font-heading font-medium text-xl text-zinc-400 mb-6">{exp.company}</h4>
                <p className="font-sans text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const projects = [
    { 
      id: '01', 
      title: 'PM Dashboard', 
      desc: 'Role-based project management system with Python, Django, and SQL.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500">
          <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
            <motion.path 
              d="M -20 150 Q 50 50 100 120 T 220 80" 
              stroke="url(#grad1)" strokeWidth="1.5" fill="none" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.path 
              d="M -20 180 Q 80 100 120 150 T 220 100" 
              stroke="url(#grad2)" strokeWidth="1" fill="none" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )
    },
    { 
      id: '02', 
      title: 'Walmart Sales Analytics', 
      desc: 'Advanced Tableau dashboards built to analyze granular sales patterns and optimize retail strategies.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-end justify-between px-6 pb-20 opacity-20 group-hover:opacity-60 transition-opacity duration-500 gap-2">
          {[40, 70, 45, 90, 65, 100].map((h, i) => (
            <motion.div 
              key={i}
              className="w-full bg-gradient-to-t from-cyan-500/0 to-cyan-400 rounded-t-sm"
              initial={{ height: "10%" }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </div>
      )
    },
    { 
      id: '03', 
      title: 'News Aggregator', 
      desc: 'Dynamic application processing external APIs into a unified backend interface.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500">
          <motion.div 
            className="absolute w-48 h-48 border-[0.5px] border-purple-500 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute w-48 h-48 border-[0.5px] border-pink-500 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
          />
           <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
        </div>
      )
    },
    { 
      id: '04', 
      title: 'Arth Web Platform', 
      desc: 'Professional web development internship focused on API integration and UX optimization.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500 overflow-hidden">
          <div className="grid grid-cols-3 gap-2 w-[150%] h-[150%] transform rotate-12">
            {[...Array(18)].map((_, i) => (
              <motion.div 
                key={i} 
                className="bg-cyan-500/10 border border-cyan-500/20 rounded-md"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>
        </div>
      )
    },
    { 
      id: '05', 
      title: 'Gmail Add-On', 
      desc: 'Custom Gmail extension built for seamless workflow integration and productivity enhancement.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500">
          <motion.div 
            className="absolute w-32 h-32 border border-blue-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"></div>
          </motion.div>
          <motion.div 
            className="absolute w-48 h-48 border border-purple-500/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/4 -right-1 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"></div>
          </motion.div>
          <div className="w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <div className="w-4 h-3 bg-gradient-to-r from-red-500 to-rose-400 rounded-sm"></div>
          </div>
        </div>
      )
    },
    { 
      id: '06', 
      title: 'Cinematic Data Portfolio', 
      desc: 'Advanced web application featuring Next.js, Framer Motion, HTML5 Canvas sequencing, and WebGL.', 
      link: '#',
      visual: (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500">
          <motion.div 
            className="w-24 h-24 border-[1px] border-pink-500/50"
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="absolute inset-0 border-[1px] border-cyan-500/50"
              animate={{ rotateX: -360, rotateY: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="min-h-screen w-full py-32 px-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h2 className="font-mono text-blue-400 text-sm tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <span className="w-8 h-px bg-blue-400"></span>
          03 / Artifacts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <a key={idx} href={proj.link} className="interactive group relative block h-[50vh] min-h-[400px] border border-zinc-800 rounded-2xl bg-surface/90 overflow-hidden p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"></div>
              
              {proj.visual}
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-zinc-500 text-xs py-1 px-3 border border-zinc-800 rounded-full group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors backdrop-blur-md bg-black/20">{proj.id}</span>
                <div className="w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:rotate-45 transition-all duration-300 backdrop-blur-md">
                  <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-background transition-colors" />
                </div>
              </div>
              
              <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-x-2 backdrop-blur-sm bg-black/10 p-4 -mx-4 -mb-4 rounded-xl">
                <h3 className="font-heading font-bold text-3xl xl:text-4xl text-white mb-4 drop-shadow-md">{proj.title}</h3>
                <p className="font-sans text-xs xl:text-sm text-zinc-400 uppercase tracking-widest leading-relaxed group-hover:text-zinc-200 transition-colors">{proj.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center py-32 px-8 text-center relative">
      <h2 className="font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
        <span className="w-4 h-px bg-cyan-400"></span>
        04 / Connection
        <span className="w-4 h-px bg-cyan-400"></span>
      </h2>
      <h3 className="font-heading font-black text-6xl md:text-8xl text-white mb-16 tracking-tight">
        Ready for <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">clarity?</span>
      </h3>
      <a 
        href="mailto:sohanpatel6168@gmail.com" 
        className="interactive relative group overflow-hidden bg-white text-background px-12 py-6 rounded-full font-heading font-bold text-lg tracking-widest uppercase hover:scale-105 transition-transform duration-300"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">sohanpatel6168@gmail.com</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
      </a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-zinc-800 flex flex-col items-center justify-center bg-background/95 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="font-heading font-semibold text-zinc-400 text-sm tracking-[0.4em] uppercase mb-4 group hover:text-white transition-colors cursor-default">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-4 animate-pulse"></span>
        Global Reach · Remote Ready
      </div>
      <div className="font-mono text-zinc-600 text-xs tracking-widest">
        © {new Date().getFullYear()} SOHAN PATEL. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
