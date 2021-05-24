const puppeteer = require(`puppeteer`)

const app = async() => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ["--enable-automation"]
    })
    const page = await browser.newPage()
    await page._client.send("Emulation.clearDeviceMetricsOverride")
    await page.goto(`https://www.linkedin.com/`)
    

// =================login --username & password=============================
    
    await page.waitForSelector(`#session_key`)
    // put your username here
    
    await page.type(`#session_key`, `iDontKnow`)
    // put your password here

    await page.type(`#session_password`, `weDontDoThatHere`)
    // clicking on signon button
    await page.click(`.sign-in-form__submit-button`)
    console.log(`login successful`);

// waiting for the myNetwork to load
    await page.waitForXPath(`//*[@id="ember21"]`)
    const [networkButton] = await page.$x(`//*[@id="ember21"]`)
    networkButton.click()
    console.log(`neteork tab opned`);


//======================= closing chatting tab================================
// ye chatting tab band nhi ho rha ...iska class ka issue hai
    await page.waitForSelector(`.msg-overlay-bubble-header__details.flex-row align-items-center.ml1`)
    await page.click(`.msg-overlay-bubble-header__details flex-row.align-items-center.ml1`)
    console.log(`chatting tab closed`);


// ======================see-all(button)==============================================
    // ye see-all ko band rakh ke bhi req accept ho rhi hai..so jyada req aane ke baad check karenge

// wating for see-all button to load
    // await page.waitForXPath(`/html/body/div[6]/div[3]/div/div/div/div/div/div/div/main/section/header/a`)
    // const [seeAllButton] = await page.$x(`/html/body/div[6]/div[3]/div/div/div/div/div/div/div/main/section/header/a`)
    // seeAllButton.click()

    

//============================== Main functionality=========================================
    await page.evaluate(() => {
        const req = document.getElementsByClassName(`invitation-card__action-btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view`)
        let i = 0
        while(req.length > 1){
            req[i].click();
            i++
        }
    })

}

app()


