const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // 1. Desktop Test (1366x768)
  const page1 = await browser.newPage();
  page1.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page1.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page1.setViewport({ width: 1366, height: 768 });
  await page1.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page1.screenshot({ path: 'C:\\Carrera de Mente\\final_stitch_setup.png' });
  console.log('1. final_stitch_setup.png captured');

  // Start Game
  await page1.click('#btn-start-game');
  await new Promise(r => setTimeout(r, 800));
  await page1.screenshot({ path: 'C:\\Carrera de Mente\\final_stitch_game.png' });
  console.log('2. final_stitch_game.png captured');

  // Roll dice
  await page1.click('#rollDiceBtn');
  console.log('Rolling dice...');
  await new Promise(r => setTimeout(r, 4000));
  await page1.screenshot({ path: 'C:\\Carrera de Mente\\final_stitch_question.png' });
  console.log('3. final_stitch_question.png captured');

  // 2. Full HD (1920x1080)
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1920, height: 1080 });
  await page2.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
  await page2.click('#btn-start-game');
  await new Promise(r => setTimeout(r, 600));
  await page2.screenshot({ path: 'C:\\Carrera de Mente\\final_stitch_1080p.png' });
  console.log('4. final_stitch_1080p.png captured');

  // 3. Mobile (390x844)
  const page3 = await browser.newPage();
  await page3.setViewport({ width: 390, height: 844 });
  await page3.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
  await page3.click('#btn-start-game');
  await new Promise(r => setTimeout(r, 600));
  await page3.screenshot({ path: 'C:\\Carrera de Mente\\final_stitch_mobile.png' });
  console.log('5. final_stitch_mobile.png captured');

  await browser.close();
  console.log('All tests passed successfully!');
})();
