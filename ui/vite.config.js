import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})