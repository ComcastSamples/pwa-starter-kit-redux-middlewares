[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")

## Redux Middleware Examples

This uses the [PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/) as a starting point
and then adds examples of various [Redux middlewares](https://redux.js.org/advanced/middleware)
by extending the base Redux counter example with an additional data fetch & rendering of that data.

The async-api branch contains examples of:
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-saga](https://redux-saga.js.org/)
- [redux-observable](https://redux-observable.js.org/)

### Links to diffs showing specific examples:
- [Adding the async data fetch with redux-thunk](https://github.com/ComcastSamples/pwa-starter-kit-redux-middlewares/commit/285effcb5b3e9a9fe669b1984c0c24f97b282ab8)
- [Switching from redux-thunk to redux-saga](https://github.com/ComcastSamples/pwa-starter-kit-redux-middlewares/commit/a31e7188f8580f4fa11b13e1b744c88d8b4790fc)
- [Switching from redux-thunk to redux-observable](https://github.com/ComcastSamples/pwa-starter-kit-redux-middlewares/compare/285effc..414eaf2)
- [Switching from redux-saga to redux-observable](https://github.com/ComcastSamples/pwa-starter-kit-redux-middlewares/commit/414eaf27770e404be1de8982e4c1a6206d8d2394)
- [Switching from redux-observable to redux-saga](https://github.com/ComcastSamples/pwa-starter-kit-redux-middlewares/compare/414eaf2..a31e718)

Also worth noting, the Shopping Cart example uses [Reselect](https://github.com/reduxjs/reselect) selector library for Redux which is worth learning.

To run these locally:
- `npm install`
- `npm start`
- View http://127.0.0.1:8081/view2 in your browser

