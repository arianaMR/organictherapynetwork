import { readFileSync } from 'fs';
import { join } from 'path';

// in dev, we start at build dir and jump out to public dir. after build., server file is right next to public dir
const htmlPath = process.env.NODE_ENV === 'development' ? join(__dirname, '..', 'public', 'html') :join(__dirname, 'public', 'html')

const head = readFileSync(join(htmlPath, 'head.html'), 'utf-8');
const body = readFileSync(join(htmlPath, 'body.html'), 'utf-8');

export default {
  head,
  body,
};
