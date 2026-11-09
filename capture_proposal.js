const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Mobile (420x720 - exact match to user's mobile simulator screenshot)
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 420, height: 720 });
  await page1.goto('http://localhost:8000/preview_mobile_fix.html', { waitUntil: 'networkidle0' });
  await page1.evaluate(() => {
    // Start game to show board
    const btn = document.getElementById('btn-start-game');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page1.screenshot({ path: 'C:\\Carrera de Mente\\propuesta_mobile_corregida.png' });
  console.log('1. propuesta_mobile_corregida.png captured');

  // 2. Desktop (1366x768)
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1366, height: 768 });
  await page2.goto('http://localhost:8000/preview_mobile_fix.html', { waitUntil: 'networkidle0' });
  await page2.evaluate(() => {
    const btn = document.getElementById('btn-start-game');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page2.screenshot({ path: 'C:\\Carrera de Mente\\propuesta_desktop_intacta.png' });
  console.log('2. propuesta_desktop_intacta.png captured');

  await browser.close();
})();
