import { createIconFromPng } from 'electron-icon-maker';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  srcPath: join(__dirname, 'app_icon.png'),
  outputPath: __dirname,
  names: {
    ico: 'app_icon',
    icns: 'app_icon'
  }
};

createIconFromPng(options)
  .then(() => console.log('Icon created successfully!'))
  .catch(error => console.error('Error creating icon:', error));
