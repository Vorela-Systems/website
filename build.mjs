import { mkdir, copyFile, cp } from 'node:fs/promises';

await mkdir('out', { recursive: true });
await Promise.all(['index.html', 'robots.txt', 'favicon.svg'].map(file => copyFile(file, `out/${file}`)));
await cp('assets', 'out/assets', { recursive: true });
