const puppeteer = require(`puppeteer`)

const app = async() => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ["--enable-automation"]
    })
    const page = await browser.newPage()

    // This line makes the newPage full screen
    await page._client.send("Emulation.clearDeviceMetricsOverride")

    // Navigating to linkedin
    await page.goto(`https://www.linkedin.com/`)
    

// ================= login username & password =============================  
    await page.waitForSelector(`#session_key`)

    // put your username-                      :here
    await page.type(`#session_key`,      `Your_email_here`)
    
    // put your password-                      :here
    await page.type(`#session_password`, `Your_Password_here`)
   


    // clicking on signon button
    await page.click(`.sign-in-form__submit-button`)
    console.log(`login successful`);



    // calling waitForTimeout to wait for everything to load on web page
    console.log('before waiting');
    await page.waitForTimeout(10000)
    console.log('after waiting');


   // waiting for the myNetwork to load
    await page.waitForXPath(`//*[@id="ember21"]`)
    const [networkButton] = await page.$x(`//*[@id="ember21"]`)
    networkButton.click()
    console.log(`network tab opened`);



//======================= closing chatting tab================================
//                                     ---Your Linkedin Name here---
    await page.waitForSelector(`img[title="Chaitanya Khachane"]`)
    try {
        await page.click(`img[title="Chaitanya Khachane"]`)        
    } finally {
        console.log(`chatting tab closed`);
    }



// ======================see-all(button)==============================================

    // wating for see-all button to load
    await page.waitForSelector(`a[data-control-name="manage_all_invites"]`);
    await page.click(`a[data-control-name="manage_all_invites"]`)
    console.log(`see all got clicked`);
    


//============================== Main functionality=========================================
    // The evaluate function runs the below code in that browser
    try {
        await page.evaluate(() => {
            const req = document.getElementsByClassName(`invitation-card__action-btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view`)
            let i = 0
            while(req.length > 1){
                req[i].click();
                i++
            }
        })    
    } finally {
        console.log(`All Request Accepted`);
    }
}

app()


