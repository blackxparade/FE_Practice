# vue-app-scaffolding
> Vue + Webpack + Bulma scaffolding

## Getting Started

Use with NPM the `@riovir/create-vue-app` initializer:

```bash
mkdir my-app
cd my-app
npm init @riovir/vue-app
#Fill out the questions, or just keep pressing Enters. Your answers only affect the `package.json`.
```

...or just clone this repo and edit the `package.json` where `vue_app_scaffolding_` values are used.

## Try it out

The more important `npm run` scripts are:
* `npm run dev` - starts the dev server with Hot Module Replacement (CSS is temporarily not supported: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34).
* `npm run analyze` - to see what ends up in your bundle. This allows you to keep track the cost of the packages you accumulate over time.
* `npm test` - title says it all.

## Customize the project

To keep the scaffolding simpler to maintain, it produces a single static project. This means that you need to manually apply some tweaks for your specific needs. Here is a quick checklist to help:
* Do you need multilinguality? Do you want to separate locale specific content from HTML?
    * If not, remove `src/vue-setup/i18n.js` + wiring
    * Yes, but you want to fetch some or all your resources at runtime from a server: the vue-i18n plugin allows you to update the config at runtime.
* Don't want Vuex?
    * Throw it out. (See FAQ)
* What routing mode you want?
    * [History API](https://css-tricks.com/using-the-html5-history-api/) (default) - Eg.: https://your-host.com/public-path/app/user-profile. Great for SPAs but your server needs to know about it: it has to redirect any sub-paths to your index allowing the client to handle all routing including `404`s. This server feature is often referred to as the _History API fallback_.
    * **hash-based routing** - Eg.: https://your-host.com/public-path/#app/user-profile. It doesn't need any special routing config on the server side, as it puts that information behind a # in the URL. Keep in mind that the part after the # is not sent to the server. **To use it remove the `mode: 'history'` from `src/vue-setup/router.js`.**
* Want to get rid of explanation comments?
    * They are all in lines matching the `^\t*//.*$` regex in case you manually want to nuke them
		* Comments that are intended to stay (eg. ones for `ESLint`) use the `/* */` format

## F.A.Q

**Why not just use Vue CLI?**
> Especially the `Vue CLI v3+` is superior in some ways. This project was created with a specific company in mind, where `Vue.js` is only part of the build but not necessary the centerpiece. Should you personally know the maintainer of this scaffolding you can also ask him to explain any part of this project for you.

**Why are the generated project's plugins not based on questions?**
> Maintaining multiple possible fragments of the scaffolding would significally increase the maintenance cost. Instead its structure attempts to make is easy to tweak a generated project to your current needs.

**Why Vuex by default?**
> Originally wanted developers to skip the overhead [Vuex](https://github.com/vuejs/vuex) introduces. If you are just getting started with `Vue` in a pet project, I recommend throwing it out. Originally this scaffolding used a simplified `store pattern` decribed by [this article](https://skyronic.com/2016/01/vuex-basics-tutorial/). The idea was that teams would migrate to `Vuex` when their stores reached a critical size. Unfortunately in practice this rarely happened, leaving projects with an ever growing, tightly coupled `store.js`. 

**Tabs by default?! (after v7.1.1+)**
> Get out! :) Okay, seriously this detail was requested quite often, so there you go. Change `.editorconfig` to your needs if necessary. You are using an IDE with `editorconfig` support right? O_o
