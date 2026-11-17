const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ffmpeg = path.resolve('node_modules/ffmpeg-static/ffmpeg.exe');
const srcDir = path.resolve('public/videos/add video combination in the scrolling this sequence');
const outBaseDir = path.resolve('public/frames');

fs.mkdirSync(outBaseDir, { recursive: true });

const videoFiles = [
  'video number 1 add.mp4',
  'video number 2 add.mp4',
  'video number 3 add.mp4',
  'video number 4 add.mp4',
  'video number 5 add.mp4',
  'video number 6 add.mp4',
  'video number 7 add.mp4',
  'video number 8 add.mp4',
];

console.log('Starting frame extraction for 8 stages...');
const t0 = Date.now();

videoFiles.forEach((file, idx) => {
  const stageNum = idx + 1;
  const stageDir = path.join(outBaseDir, `stage-${stageNum}`);
  fs.mkdirSync(stageDir, { recursive: true });

  const srcPath = path.join(srcDir, file);
  const outPattern = path.join(stageDir, 'frame_%03d.webp');

  console.log(`Extracting Stage ${stageNum}: ${file}...`);
  const tStage = Date.now();

  const res = cp.spawnSync(ffmpeg, [
    '-y',
    '-i', srcPath,
    '-vf', 'fps=6,scale=960:-2',
    '-c:v', 'libwebp',
    '-quality', '75',
    outPattern
  ]);

  if (res.error) {
    console.error(`Error on stage ${stageNum}:`, res.error);
    return;
  }

  const generated = fs.readdirSync(stageDir).filter(f => f.endsWith('.webp'));
  let stageBytes = 0;
  generated.forEach(f => stageBytes += fs.statSync(path.join(stageDir, f)).size);

  const manifest = {
    stage: stageNum,
    count: generated.length,
    pattern: `/frames/stage-${stageNum}/frame_%03d.webp`,
    totalBytes: stageBytes
  };

  fs.writeFileSync(path.join(stageDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`Stage ${stageNum} done in ${Date.now() - tStage}ms: ${generated.length} frames, ${(stageBytes / 1024 / 1024).toFixed(2)} MB`);
});

let totalAllBytes = 0;
let totalFrames = 0;
for (let s = 1; s <= 8; s++) {
  const sDir = path.join(outBaseDir, `stage-${s}`);
  if (fs.existsSync(sDir)) {
    const fList = fs.readdirSync(sDir).filter(f => f.endsWith('.webp'));
    totalFrames += fList.length;
    fList.forEach(f => totalAllBytes += fs.statSync(path.join(sDir, f)).size);
  }
}

console.log(`\nALL 8 STAGES EXTRACTED in ${((Date.now() - t0) / 1000).toFixed(1)}s!`);
console.log(`Total Frames: ${totalFrames}, Total Size: ${(totalAllBytes / 1024 / 1024).toFixed(2)} MB`);
