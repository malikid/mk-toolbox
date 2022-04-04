import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import $ from 'cheerio'

export default async function handler(req, res) {
  console.log("!!! req.body.url", req.body.url)
  const fundaUrl = req.body.url;
  if(!fundaUrl) {
    return res.status(404).send({})
  }

  try {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(fundaUrl)
    // await page.screenshot({ path: '/Users/m.h.chang/Desktop/example.png' });
    const html = await page.content()
    const propertyName = $('.object-header__title', html).text();
    console.log("!!! propertyName", propertyName);
    const mediaViewerPlattegrondContainer = $('.media-viewer-plattegrond-container', html)
    const fmlFileUrl = mediaViewerPlattegrondContainer.attr('data-plattegrond-src');
    console.log("!!! fmlFileUrl", fmlFileUrl);

    const fmlPage = await browser.newPage()
    await fmlPage.goto(fmlFileUrl)
    await fmlPage.screenshot({ path: '/Users/m.h.chang/Desktop/example.png' });
    const fmlHtml = await fmlPage.content()
    // console.log("!!! fmlHtml", fmlHtml);
    const webkitXmlViewerSourceXml = $('#webkit-xml-viewer-source-xml', fmlHtml).html()
    // console.log("!!! webkitXmlViewerSourceXml", webkitXmlViewerSourceXml);

    await browser.close();

    return res.json({
      name: propertyName,
      fml: webkitXmlViewerSourceXml
    })
  } catch (error) {
    console.log("!!! error", error)
    return res.status(404).send({error})
  };

  res.status(200).json({ name: 'John Doe' })
}
