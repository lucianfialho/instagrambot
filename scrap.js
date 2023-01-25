const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    const username = 'lucianfialho'
    // Acesse a página de perfil do Instagram desejada
    await page.goto(`https://www.instagram.com/`);
    
    await page.waitForSelector(`#loginForm`);
    await page.type('[name="username"]', 'myhomedesk');
    await page.type('[name="password"]', '5l4vgF&C7Sz5');
    await page.click('[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 3000))

    await page.goto(`https://www.instagram.com/lucianfialho`);
    // Aguarde até que a lista de seguidores seja carregada na página
    await page.waitForSelector('main[role="main"]')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await Promise.all([
        page.$eval(`._acap`, element =>
          element.click()
        ),
        await page.waitForNavigation(),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 3000))
    await page.waitForSelector(`[href="/${username}/followers/"]`);
    await page.click(`[href="/${username}/followers/"]`);

    // Aguarde até que a lista de seguidores seja carregada na modal
    await page.waitForSelector('[role="dialog"] a[role="link"]');

    // Extraia a lista de seguidores
    const followers = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('[role="dialog"] a[role="link"]'));
        return elements.map((element) => element.innerText);
    });

    console.log(`Este perfil tem os seguintes seguidores: ${followers.join(', ')}.`);

    await browser.close();
})();