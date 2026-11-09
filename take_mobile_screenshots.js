const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });

  await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });

  const brainDir = 'C:\\Users\\gpy20\\.gemini\\antigravity\\brain\\07fe0298-4891-45eb-90f7-535187975ff0';

  // 1. Setup Screen
  await page.screenshot({ path: path.join(brainDir, 'mobile_setup.png') });
  console.log('Saved mobile_setup.png');

  // 2. Start Game
  await page.click('#btn-start-game');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(brainDir, 'mobile_game.png') });
  console.log('Saved mobile_game.png');

  // 3. Question Modal
  await page.evaluate(() => {
    if (window.game) {
      window.game.openQuestionModal(window.game.boardTiles ? window.game.boardTiles[0] : { id: 1, cat: 'matematica', label: 'Matemática', icon: '📐', star: false });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(brainDir, 'mobile_question.png') });
  console.log('Saved mobile_question.png');

  await browser.close();
})();
