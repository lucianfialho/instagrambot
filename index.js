const puppeteer = require('puppeteer');

(async () => {
    const username = 'lucianfialho'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Iniciando bot")
    // Acesse a página de perfil do Instagram desejada
    await page.goto(`https://www.instagram.com/${username}`);

    console.log("Aguardando a lista de seguidores seja carregada na página")
    // Aguarde até que a lista de seguidores seja carregada na página
    await page.waitForSelector(`[href="/${username}/followers/"]`);
    await page.click(`[href="/${username}/followers/"]`);
    
    console.log("Puxando seguidores")
    // Aguarde até que a lista de seguidores seja carregada na modal
    await page.waitForSelector('[role="dialog"] ul li');

    // Extraia a lista de seguidores
    const followers = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('[role="dialog"] ul li'));
        return elements.map((element) => element.innerText);
    });

    console.log(`Este perfil tem os seguintes seguidores: ${followers.join(', ')}.`);

    await browser.close();
})();