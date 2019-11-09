<h1 align="center">ironmarch-api</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/jewishworker" target="_blank">
    <img alt="Twitter: jewishworker" src="https://img.shields.io/twitter/follow/jewishworker.svg?style=social" />
  </a>
</p>

> API interface for Iron March data dump

## Install

```sh
yarn install || npm install
```

## Development

This API service is designed to make use of Now.sh's serverless interface. Now-friendly API routes, which duplicate the routes specified in the main `routes.js` file can be found in the API folder. To test with Now, install `now` from, then run `now dev`.

```sh
yarn global add now || npm install -g now
now dev
```

You can alternatively proceed without the use of Now.

```sh
yarn dev || npm run dev
```

## Deploy

```sh
now
```

## Routes

**`/post`**

- `id`: Get post by ID *n* (Integer)
- `limit`: Limit results by *n*  (Integer)
- `offset`: Offset results by *n*  (Integer)
- `user`: Get posts by user ID *n*  (Integer)
- `terms`: Find posts containing terms (String)

**`/message`**

- `id`: Get message by ID *n* (Integer)
- `limit`: Limit results by *n*  (Integer)
- `offset`: Offset results by *n*  (Integer)
- `user`: Get messages by user ID *n*  (Integer)
- `terms`: Find messages containing terms (String)

**`/user`**

- `id`: Get user by ID *n* (Integer)
- `limit`: Limit results by *n*  (Integer)
- `offset`: Offset results by *n*  (Integer)
- `terms`: Find usernames containing terms (String)

## Author

👤 **The Jewish Worker <hello@jewishworker.org>**

* Twitter: [@jewishworker](https://twitter.com/jewishworker)
* GitLab: [@jewishworker](https://gitlab.com/jewishworker)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/jewishworker/ironmarch-api/issues).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/jewishworker">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
