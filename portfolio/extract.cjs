const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = path.resolve('../vedio1/frame 2.mp4');
const outputDir = path.resolve('./public/frames2');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Extracting frames from ${inputVideo} to ${outputDir} using ${ffmpeg}`);

try {
  // We extract at a fixed fps. If it creates too many frames, we can adjust it later.
  // fps=15 gives a good balance of smoothness and file size.
  execSync(`"${ffmpeg}" -i "${inputVideo}" -vf fps=15 "${outputDir}/frame_%03d.png"`, { stdio: 'inherit' });
  console.log('Extraction complete!');
} catch (e) {
  console.error('Error extracting frames', e);
}
