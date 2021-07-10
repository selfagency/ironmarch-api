<h1 align="center">ironmarch-api</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue.svg?cacheSeconds=2592000" />
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

This API service is designed to make use of Vercel's serverless functions interface. Run locally with `yarn dev`.

## Routes

**`/post`**

- `id`: Get post by ID _n_ (Integer)
- `limit`: Limit results by _n_ (Integer)
- `offset`: Offset results by _n_ (Integer)
- `user`: Get posts by user ID _n_ (Integer)
- `terms`: Find posts containing terms (String)

**`/message`**

- `id`: Get message by ID _n_ (Integer)
- `limit`: Limit results by _n_ (Integer)
- `offset`: Offset results by _n_ (Integer)
- `user`: Get messages by user ID _n_ (Integer)
- `terms`: Find messages containing terms (String)

**`/user`**

- `id`: Get user by ID _n_ (Integer)
- `limit`: Limit results by _n_ (Integer)
- `offset`: Offset results by _n_ (Integer)
- `terms`: Find usernames containing terms (String)

**`/thread`**

- `id`: Get thread (message collection) by ID _n_ (Integer)

**`/meta`**

- `data`: Get data collection by type (String)
  - `discord`: All discovered Discord invite links
  - `facebook`: All discovered user Facebook profiles
  - `linkedin`: All discovered user LinkedIn profiles
  - `locales`: Number of users by city, region, and country
  - `skype`: All discovered user Skype account names
  - `twitter`: All discovered user Twitter profiles
  - `all`: All of the above

## Author

👤 **The Jewish Worker <hello@jewishworker.org>**

- Twitter: [@jewishworker](https://twitter.com/jewishworker)
- GitLab: [@jewishworker](https://gitlab.com/jewishworker)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/jewishworker/ironmarch-api/issues).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/jewishworker">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
