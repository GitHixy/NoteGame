// Entry point for Electron main process
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'app_icon.png'), // Use your logo
    autoHideMenuBar: true, // Hide the menu bar but show window controls
    backgroundColor: '#0f172a', // Slate-900 color to match the app background
    minWidth: 1200,
    minHeight: 800,
  });
  win.loadFile('index.html');
  
  // Hide the menu by default (another approach)
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
