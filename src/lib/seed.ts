import { loadEnv } from 'vite';
process.env = { ...process.env, ...loadEnv(process.env.NODE_ENV!, process.cwd()) };


