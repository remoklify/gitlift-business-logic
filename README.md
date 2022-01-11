<p align="center">
   <a href="https://remoklify.com">
    <img src="https://raw.githubusercontent.com/remoklify/remoklify.github.io/master/assets/logo/developed-by.png" alt="Logo" width=200>
  </a>
</p>

<p align="center">
   <a href="https://remoklify.com">
    <img src="https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/badge/powered-by-dark-mode.min.png" alt="Logo" width=160>
  </a>
</p>


<h1 align="center">
Remoklify - Gitlift Business Logic Server v1
</h1>

[![License](https://img.shields.io/github/license/remoklify/gitlift-business-logic?color=43b043&style=for-the-badge)](LICENSE)
[![Issues](https://img.shields.io/github/issues/remoklify/gitlift-business-logic?color=43b043&style=for-the-badge)](https://github.com/remoklify/gitlift-business-logic/issues)
[![PRCLosed](https://img.shields.io/github/issues-pr-closed-raw/remoklify/gitlift-business-logic?color=43b043&style=for-the-badge)](https://github.com/remoklify/gitlift-business-logic/pulls?q=is%3Apr+is%3Aclosed)
[![LastCommit](https://img.shields.io/github/last-commit/remoklify/gitlift-business-logic?color=43b043&style=for-the-badge)](https://github.com/remoklify/gitlift-business-logic/commits/master)
[![Release](https://img.shields.io/github/release/remoklify/gitlift-business-logic?include_prereleases&color=43b043&style=for-the-badge)](https://github.com/remoklify/gitlift-business-logic/releases)
[![SonarCloud](https://img.shields.io/sonar/quality_gate/open-template-hub_business-logic-server-template?server=https%3A%2F%2Fsonarcloud.io&label=Sonar%20Cloud&style=for-the-badge&logo=sonarcloud)](https://sonarcloud.io/dashboard?id=open-template-hub_business-logic-server-template)

Gitlift Business Logic Server.

## Ways to Begin

### 1. Express Deploy

Deploy this template to Heroku

[![Deploy](https://img.shields.io/badge/Deploy_to-Heroku-7056bf.svg?style=for-the-badge&logo=heroku)](https://heroku.com/deploy?template=https://github.com/remoklify/gitlift-business-logic)

### 2. Start with Server Generator

Create your server with Server Generator Package

[![NPM](https://img.shields.io/badge/NPM-server_generator-cb3837.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@open-template-hub/server-generator)

### 3. GitHub Template

Use this repository as a Template

[![GitHubTemplate](https://img.shields.io/badge/GitHub-Template-24292e.svg?style=for-the-badge&logo=github)](https://github.com/remoklify/gitlift-business-logic/generate)

## Installations

Install **nodejs** and **npm** via **[nodejs.org](https://nodejs.org)**.

Check installed versions of **nodejs** and **npm** via running following commands:

```
node -v
npm -v
```

Check project's current **nodejs** and **npm** version from **[package.json](package.json)**.

## Environment Variables

If you don't give **RESPONSE_ENCRYPTION_SECRET**, response encryption mechanism will be disabled automatically.

``` applescript
PORT=4002

PROJECT=GITLIFT
MODULE=BusinessLogicServer
ENVIRONMENT=Local

GITHUB_API_AUTH_TOKEN=Bearer ghp_xxxxxxx
GITHUB_API_URL=https://api.github.com/graphql

RESPONSE_ENCRYPTION_SECRET={Response Encryption Secret}
```

## Http Requests

You can find list of available http request in the [requests](assets/requests) directory. You can run http requests directly via **WebStorm**, for more information check out: [jetbrains.com/help/idea/http-client-in-product-code-editor.html](https://jetbrains.com/help/idea/http-client-in-product-code-editor.html)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/fatihturker"><img src="https://avatars1.githubusercontent.com/u/2202179?s=460&u=261b1129e7106c067783cb022ab9999aad833bdc&v=4" width="100px;" alt=""/><br /><sub><b>Fatih Turker</b></sub></a><br /><a href="https://github.com/remoklify/gitlift-business-logic/issues/created_by/fatihturker" title="Answering Questions">💬</a> <a href="https://github.com/remoklify/gitlift-business-logic/commits?author=fatihturker" title="Documentation">📖</a> <a href="https://github.com/remoklify/gitlift-business-logic/pulls?q=is%3Apr+reviewed-by%3Afatihturker" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Contributing

Refer to **[CONTRIBUTING.md](https://github.com/open-template-hub/.github/blob/master/docs/CONTRIBUTING.md)** to see how to contribute to Open Template Hub.

<br/>

## Code of Conduct

Refer to **[CODE_OF_CONDUCT.md](https://github.com/open-template-hub/.github/blob/master/docs/CODE_OF_CONDUCT.md)** to see contributor covenant code of conduct.

<br/>

## LICENSE

The source code for this project is released under the [MIT License](LICENSE).
