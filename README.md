<h1 align="center">Welcome to good-read-clone 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D16.17.x-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D8.15.x-blue.svg" />
  <a href="https://github.com/mabc224/book-library-react-nextjs-graphql#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mabc224/book-library-react-nextjs-graphql/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mabc224/book-library-react-nextjs-graphql/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/mabc224/good-read-clone" />
  </a>
</p>

> Book Library web application using Next.js 13 and GraphQL

### 🏠 [Homepage](https://github.com/mabc224/book-library-react-nextjs-graphql#readme)

## Prerequisites

- node >=16.17.x
- npm >=8.15.x

## Install

```sh
npm install
```

## Usage
Specifies your postgres database connection (via an environment variable) by putting it in `.env` file

Then, run the prisma to create tables with seed data

```sh
npm run prisma:migrate:deploy
```

Seed Database

```sh
npx prisma db seed
```

Then, run the development server:

```sh
npm run dev
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see the result.

    Default credentials: 
        username: user0
        password: password

## About Application

The application have the following features:
- [x] User authentication and authorization using JSON Web Tokens (JWT).
- [x] A file upload feature for uploading and storing book cover images.
- [ ] Webapp is multilingual, you can choose any language on top of
English for demo purposes.
- [x] The application support server side rendering (SSR).
- [x] The application have a clean and responsive design. Tailwind is in use
- [ ] Unit tests for the main functionality of the application using a
testing framework such as Jest.
- [x] The application use Apollo Client to handle all GraphQL operations
and Apollo Server for creating GraphQL API.
- [x] Use a data storage solution such as PostgreSQL to persist the
data.
- [x] A notification feature for sending real-time notifications to users.
- [ ] Use a real-time technology such as WebSockets or GraphQL subscriptions
for the notification feature.

## Author

👤 **Arsalan Bilal**

* Github: [@mabc224](https://github.com/mabc224)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mabc224/book-library-react-nextjs-graphql/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Arsalan Bilal](https://github.com/mabc224).<br />
This project is [MIT](https://github.com/mabc224/book-library-react-nextjs-graphql/blob/master/LICENSE) licensed.
