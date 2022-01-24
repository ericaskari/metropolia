import { defineConfig } from 'vite';
import { resolve } from 'path';

const VITE_BASE = process.env.VITE_BASE || '';

const root = resolve(__dirname);
const src = resolve(root, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    root,
    base: VITE_BASE,
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve('index.html'),
                hw1: resolve(src, 'hw1/index.html'),
                'hw2-2': resolve(src, 'hw2-2/index.html'),
                'hw2-3': resolve(src, 'hw2-3/index.html'),
                'hw2-4': resolve(src, 'hw2-4/index.html'),
                'hw3-1': resolve(src, 'hw3-1/index.html'),
                'hw3-2': resolve(src, 'hw3-2/index.html'),
                hw4: resolve(src, 'hw4/index.html'),
                hw5: resolve(src, 'hw5/index.html')
            }
        }
    },
    server: {
        open: true
    },
    resolve: {
        alias: [
            {
                find: /^~.+/,
                replacement: (val) => {
                    return val.replace(/^~/, '');
                }
            }
        ]
    }
});
