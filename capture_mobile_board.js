const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 750 });
  await page.goto('http://localhost:8000/preview_mobile_fix.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const btn = document.getElementById('btn-start-game');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  
  // Scroll to board wrapper
  await page.evaluate(() => {
    const board = document.querySelector('[data-purpose="board-canvas-wrapper"]');
    if (board) board.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:\\Carrera de Mente\\propuesta_mobile_tablero.png' });

  await browser.close();
  console.log('propuesta_mobile_tablero.png done');
})();
