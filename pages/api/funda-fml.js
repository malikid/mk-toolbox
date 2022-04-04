import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import $ from 'cheerio'

export default async function handler(req, res) {
  const fundaUrl = req.body.url;
  if(!fundaUrl) {
    return res.status(404).send({error: 'No url is provided!'})
  }

  try {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.goto(fundaUrl)
    const html = await page.content()
    const propertyName = $('.object-header__title', html).text();
    const mediaViewerPlattegrondContainer = $('.media-viewer-plattegrond-container', html)
    const fmlFileUrl = mediaViewerPlattegrondContainer.attr('data-plattegrond-src');

    const fmlPage = await browser.newPage()
    await fmlPage.goto(fmlFileUrl)
    const fmlHtml = await fmlPage.content()
    const webkitXmlViewerSourceXml = $('#webkit-xml-viewer-source-xml', fmlHtml).html()

    await browser.close();

    return res.json({
      name: propertyName,
      fml: webkitXmlViewerSourceXml
    })
  } catch (error) {
    console.log("!!! error", error)
    return res.status(404).send({error})
  };
}
