<p align="center">
  <img src="https://raw.githubusercontent.com/chec/commercejs-examples/master/assets/logo.svg" width="380" height="100" />
</p>
<p align="center">
A CommerceJS, Ionic, React & Stripe powered, open source native enabled storefront, cart and checkout experience.
</p>
<p align="center">
  <a href="https://github.com/chec/chopchop-ionic/blob/main/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@chec/commerce.js.svg" alt="License" />
  </a>
  <br>
  <a href="https://commercejs.com">commercejs.com</a> | <a href="https://twitter.com/commercejs">@commercejs</a> | <a href="http://slack.commercejs.com">Slack</a>
  <br />
  <br />
    <img src="https://github.com/chec/chopchop-ionic/blob/main/chopchop-screenshots.png" width="600" />
</p>

## Introduction

ChopChop is our beautifully designed, elegantly developed demo store and starter kit that sells fine tools for thoughtful cooks. We’ve created a premium brand with a commerce experience to match, ready for native platforms. Read more about this resource on the [Commerce.js blog]([article-URL]).

## 🥞 ChopChop Native Stack

* [Ionic Framework](https://ionicframework.com/)
* [Commerce.js](https://commercejs.com)
* [Stripe](https://stripe.com)
* [Capacitor](https://capacitorjs.com)

### Manual installation

Clone the project, then get started by installing the dependencies, and starting the dev server.

```
yarn install
yarn start
```

Once the server is running, it'll open up in your browser automatically, start editing the code, and enjoy!

### Testing on native

This project can be built for either iOS or Android using Capacitor. Capacitor makes it easy to build web applications that can be ran natively.

Ensure capacitor is included in the project by running:
```
npx cap init [appName] [appId]
```

Also, ensure the project has been built once by running:
```
ionic build
```

Next, add a desired platform to the project:
```
npx cap add ios
npx cap add android
```

From here, we can run the project natively using one of the following commands:
```
ionic capacitor run ion -l --external
ionic capacitor run android -l --external
```

Ionic will build the project in your platform of choice, and then you can run it in a simulator or on device from that point.

> If you find that your project has not updated correctly in the native build, run `npx cap copy` to ensure the native outputs have the latest built code.

## License

This project is licensed under [BSD-3-Clause](LICENSE.md).