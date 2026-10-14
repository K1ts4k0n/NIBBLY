import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function getBase64(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  return '';
}

const logoBase64 = getBase64(path.join(rootDir, 'public/nibbly-logo-crop.png'));
const granolaBase64 = getBase64(path.join(rootDir, 'public/richmenu/granola.jpg'));
const mascotBase64 = getBase64(path.join(rootDir, 'public/richmenu/mascot.jpg'));
const couponBase64 = getBase64(path.join(rootDir, 'public/richmenu/coupon.jpg'));
const rewardsBase64 = getBase64(path.join(rootDir, 'public/richmenu/rewards.jpg'));
const storeBase64 = getBase64(path.join(rootDir, 'public/richmenu/store.jpg'));
const chatBase64 = getBase64(path.join(rootDir, 'public/richmenu/chat.jpg'));

console.log('Assets loaded:', {
  hasLogo: !!logoBase64,
  hasGranola: !!granolaBase64,
  hasMascot: !!mascotBase64,
  hasCoupon: !!couponBase64,
  hasRewards: !!rewardsBase64,
  hasStore: !!storeBase64,
  hasChat: !!chatBase64,
});
