const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Sections.tsx',
  'src/components/Navbar.tsx',
  'src/components/HUDOverlay.tsx',
  'src/components/CustomCursor.tsx',
  'src/App.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace fonts
  content = content.replace(/font-serif italic/g, 'font-heading font-bold tracking-tight');
  content = content.replace(/font-serif/g, 'font-heading font-bold');
  
  // Replace colors
  content = content.replace(/stone/g, 'zinc');
  content = content.replace(/#0a0a0a/g, '#09090b');

  // Add some cyan accents to interactive elements
  // In Projects, replace hover:border-zinc-500 with hover:border-cyan-500
  content = content.replace(/group-hover:border-zinc-500/g, 'group-hover:border-cyan-500');
  content = content.replace(/hover:border-zinc-700/g, 'hover:border-zinc-600 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
