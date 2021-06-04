const puppeteer = require(`puppeteer`);
const dotenv = require('dotenv');
dotenv.config();

const app = async () => {
  // If you dont want this programme to open sepearate window for automation then remove below code
  // Remove The object from launch function ---if (needed)
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
  });
  const page = await browser.newPage();

  // This line makes the browser full screen
  await page._client.send('Emulation.clearDeviceMetricsOverride');

  // setting user agent so linkedin not gonna think we are bot or something else
  await page.setUserAgent(
    `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36`
  );

  // Navigating to linkedin
  await page.goto(`https://www.linkedin.com/`);

  // ================= login username & password ==============================================
  await page.waitForSelector(`#session_key`);

  // TYPING USERNAME AND PASSWORD
  await page.type(`#session_key`, `${process.env.USER}`);
  await page.type(`#session_password`, `${process.env.PASSWORD}`);

  // clicking on SIGNIN button
  await page.click(`.sign-in-form__submit-button`);
  console.log(`login successful`);

  // calling waitForTimeout to wait for everything to load on web page
  console.log('before waiting');
  await page.waitForTimeout(10000);
  console.log('after waiting');

  // waiting for the myNetwork to load
  await page.waitForXPath(`//*[@id="ember21"]`);
  const [networkButton] = await page.$x(`//*[@id="ember21"]`);
  networkButton.click();
  console.log(`network tab opened`);

  //======================= closing chatting tab===============================================

  try {
    await page.evaluate(() => {
      let dropDown = document.querySelectorAll(
        '.msg-overlay-bubble-header__controls.display-flex > *'
      )[2];
      dropDown.click();
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`dropdown closed`);
  }

  // ======================see-all(button)=====================================================
  // waiting for see-all Button to load
  await page.waitForSelector(`a[data-control-name="manage_all_invites"]`);
  await page.click(`a[data-control-name="manage_all_invites"]`);
  console.log(`see all got clicked`);

  //============================== Main functionality==========================================
  // The evaluate function runs the below code in that browser
  try {
    await page.evaluate(() => {
      const req = document.getElementsByClassName(
        `invitation-card__action-btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view`
      );
      let i = 0;
      while (req.length > 0) {
        req[i].click();
        i++;
      }
    });
  } finally {
    console.log(`All Request Accepted`);
  }
};

app();
