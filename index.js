require('dotenv').config();
const FB = require('fb');


(async () => {
    // FB.setAccessToken(process.env.INSTAGRAM_TOKEN);
    // FB.api('/17841401640520478/insights?metric=impressions&period=day', function (res) {
    //     if(!res || res.error) {
    //      console.log(!res ? 'error occurred' : res.error);
    //      return;
    //     }
    //     console.log(res);
    // });

    const response = await fetch(`https://graph.instagram.com/v15.0/17841401640520478?fields=id,username&access_token=${process.env.INSTAGRAM_TOKEN}`)
    console.log(await response.json())
})();