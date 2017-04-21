## next-data

This repo is a dashboard for all of the Keen.Io data we collect on Phoenix Next.

## Setup

```sh
$ npm install
$ cp .env.example .env
$ webpack
```

## Development

This requires the Heroku toolchain.

```sh
$ npm run dev
```

This will start the server with *Nodemon* so it auto restarts on server changes, and kicks off a webpack process so it rebuilds the client JS when that changes.

To run the server in production mode, use

```sh
$ npm start
```
