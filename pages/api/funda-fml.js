import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import $ from 'cheerio'

const ERROR_MESSAGE = {
  INVALID_FUNDA_URL: 'Please provide a funda url!',
  SOLD_PROPERTY: 'There is no floor plan available for sold properties. Please provide an unsold property url!',
  NO_FLOOR_PLAN: 'There is no floor plan found for this property. Please try another one!'
}

const isFundaUrlValid = url => /^https:\/\/www.funda.nl\//.test(url)
const isFundaUrlSoldProperty = url => /\/verkocht\//g.test(url)

export default async function handler(req, res) {
  const fundaUrl = req.body.url;

  if(!fundaUrl || !isFundaUrlValid(fundaUrl)) {
    return res.status(404).send({error: ERROR_MESSAGE.INVALID_FUNDA_URL})
  }

  if(isFundaUrlSoldProperty(fundaUrl)) {
    return res.status(404).send({error: ERROR_MESSAGE.SOLD_PROPERTY})
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

    if(!webkitXmlViewerSourceXml) {
      return res.status(404).send({error: ERROR_MESSAGE.NO_FLOOR_PLAN})
    }

    return res.json({
      name: propertyName,
      fml: webkitXmlViewerSourceXml
    })
  } catch (error) {
    console.log("!!! error", error)
    return res.status(404).send({error: ERROR_MESSAGE.NO_FLOOR_PLAN})
  };
}
