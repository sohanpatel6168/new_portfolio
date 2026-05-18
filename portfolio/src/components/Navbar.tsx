

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center mix-blend-difference text-zinc-200">
      <div className="flex flex-col">
        <span className="font-sans font-medium text-lg tracking-widest">SOHAN PATEL</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 mt-1">DATA ARCHITECTURE</span>
      </div>
      <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest">
        <a href="#about" className="interactive hover:text-white transition-colors">About</a>
        <a href="#skills" className="interactive hover:text-white transition-colors">Skills</a>
        <a href="#experience" className="interactive hover:text-white transition-colors">Experience</a>
        <a href="#projects" className="interactive hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="interactive hover:text-white transition-colors">Contact</a>
      </div>
    </nav>
  );
}
