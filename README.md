# Resium

Resium is a reddit client for the web.

**_This app is currently in development and I highly advise against using it with your primary reddit account as it may (and probably will) break something_**

## Run (Development mode)

1. [Create a reddit _web app_](https://www.reddit.com/prefs/apps) and set the redirect URL to your development server's base url.
2. Generate a secure random string `SECRET` using your favorite method of choice. If you want to listen to cosmic microwave background radiation, I won't stop you. Or you could just do:

```sh
openssl rand -base64 63
```

3. Create a .env.local using [.env.example](.env.example) as the template. Include CLIENT_ID, CLIENT_SECRET obtained from the previous step.
4. Install dependencies

```sh
yarn install
```

4. Run the development server

```sh
yarn dev
```

Copyright &copy; 2021 hrishi045

Licensed under LGPLv3 (See [LICENSE.md](LICENSE.md))
