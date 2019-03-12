# ringcentral-chrome-extension-template-nospa <!-- omit in toc -->

RingCentral embeddable Chrome/Firefox extension template for not single page app CRM site.

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Demo video(RedTailCRM)](#demo-videoredtailcrm)
- [Screenshots(Insightly and Hubspot)](#screenshotsinsightly-and-hubspot)
- [Realworld examples](#realworld-examples)
- [Build and Use](#build-and-use)
- [Build with custom RingCentral clientID/appServer](#build-with-custom-ringcentral-clientidappserver)
- [Make the features works](#make-the-features-works)
- [Credits](#credits)
- [License](#license)

## Features

- Add Click-to-call button in page.
- Hover conact list to show Click-to-call tooltip.
- Convert phone number text to Click-to-call link.
- Popup caller/callee info panel when call inbound/outbound
- Build with custom app config
- Show contact event from RingCentral Widgets
- Manully/auto Sync Call log to third party contact event

## Demo video(RedTailCRM)

[https://youtu.be/fAwsIBv5Mcw](https://youtu.be/fAwsIBv5Mcw)

## Screenshots(Insightly and Hubspot)

| screenshots            |  screenshots |
:-------------------------:|:-------------------------:
![insightly-1](https://github.com/ringcentral/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-5.png) | ![insightly-1](https://github.com/ringcentral/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-4.png)
![insightly-1](https://github.com/ringcentral/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-3.png) | ![insightly-1](https://github.com/ringcentral/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-2.png)
![insightly-1](https://github.com/ringcentral/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-1.png) | ![x](https://github.com/ringcentral/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs6.png)
![x](https://github.com/ringcentral/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs7.png) |  

## Realworld examples

- [redtail-embeddable-ringcentral-phone](https://github.com/ringcentral/redtail-embeddable-ringcentral-phone)

## Build and Use

1. build chrome extension files

```bash

# install dependencies, requires nodejs8.10+
npm i

# create config file, and set proper thirdPartyConfigs.serviceName
cp config.sample.js config.js

# then run it
npm start

# edit src/*.js, webpack will auto-rebuild,
# after rebuild, do not forget to refresh in extension page
```

1. Go to Chrome extensions page.
2. Open developer mode
3. Load `dist` as unpacked package.
4. Go to the CRM site to check

## Build with custom RingCentral clientID/appServer

- Create an app from [https://developer.ringcentral.com/](https://developer.ringcentral.com/), make sure you choose a browser based app, and set permissions: `Edit Messages`, `Edit Presence`, `Internal Messages`, `Read Accounts`, `Read Call Log`, `Read Contacts`, `Read Messages`, `Read Presence`, `RingOut`, `SMS` and `VoIP Calling`, ---> <a href="https://developer.ringcentral.com/new-app?name=Sample+Bot+App&desc=A+sample+app+created+in+conjunction+with+the+ringcentral+extention&public=true&type=ServerBot&carriers=7710,7310,3420&permissions=EditMessages,EditPresence,InternalMessages,ReadAccounts,ReadCallLog,ReadContacts,ReadMessages,ReadPresence,RingOut,SMS,VoipCalling&redirectUri=" target="_blank">Click to create app</a>, add `https://ringcentral.github.io/ringcentral-embeddable/redirect.html` to your redirect URI list, Edit `config.js`.

```js

  ringCentralConfigs: {
    // your ringCentral app's Client ID
    clientID: 'your-clientID',

    // your ringCentral app's Auth Server URL
    appServer: 'your ringCentral app Auth Server URL'
  },
```

## Make the features works

For now it is just a widget, you can call with it, to make all the features work, still need more developer work.

To make it easier, we already set common modules to reduce developer efforts, you could set proper selectors, methods to make all features to work:

- Edit [src/content.js](src/content.js) to make all features to work.
- Further more you can edit [src/manifest.json](src/manifest.json) or [src/background.js](src/background.js) to do more customization work.
- And you can always read [Realworld examples](#realworld-examples) source code as examples.
- You can use built-in oauth support like this:

```js
// read docs about auth url from https://developer.chrome.com/apps/identity#method-launchWebAuthFlow
// make sure the redirect url match the pattern https://<app-id>.chromiumapp.org/*
import getAuthCode from 'ringcentral-embeddable-extension-common/src/feat/browser-oauth'

async function auth() {
  let authCode = await getAuthCode(authUrl)
  // do something like get access code with auth code
}
```

## Credits

Created with [Embbnux Ji](https://github.com/embbnux)'s tuturial:
 [Building Chrome Extension Integrations with RingCentral Embeddable](https://medium.com/ringcentral-developers/build-a-chrome-extension-with-ringcentral-embeddable-bb6faee808a3)

## License

MIT
