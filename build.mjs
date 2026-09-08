import { mkdir, copyFile } from 'node:fs/promises';

await mkdir('out', { recursive: true });
await Promise.all(['index.html', 'style.css', 'motion.js', 'favicon.svg'].map(file => copyFile(file, `out/${file}`)));
