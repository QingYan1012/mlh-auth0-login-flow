# Auth0 Login Flow Demo — MLH Builders Week

Minimal Single Page Application that adds Auth0 login via Universal Login.
Built for the MLH Global Hack Week: Builders Week challenge
**“Set up your first Auth0 log-in flow”** (20 points).

## ⚠️ First: replace the Client ID

Open `public/app.js` and replace the placeholder on this line:

```js
const AUTH0_CLIENT_ID = "AUTH0_CLIENT_ID";
```

with your Auth0 application's **Client ID** (Auth0 Dashboard → Applications → your app → Client ID).
The tenant domain is already set to `qingyan.jp.auth0.com`. Until you replace it,
the page shows a warning banner and login will not work.

## Auth0 Dashboard settings (when creating the application)

1. Create an **Application** of type **Single Page Web Application**.
2. In that application's **Settings**, fill in these three fields — all three use the
   same value:

   | Setting | Value |
   |---|---|
   | Allowed Callback URLs | `http://localhost:3000` |
   | Allowed Logout URLs | `http://localhost:3000` |
   | Allowed Web Origins | `http://localhost:3000` |

3. Copy the **Client ID** from the same Settings page into `public/app.js` (see above).

## Run it

```bash
npm install
npm start
```

Open http://localhost:3000 — click **“Log in with Auth0”** to sign in via
Auth0 Universal Login. After login the page shows your nickname, email,
avatar and the raw profile JSON, plus a **Log out** button.

## How it works

- `public/index.html` — login / logout buttons and a profile panel.
- `public/app.js` — creates the Auth0 client with `@auth0/auth0-spa-js`
  (loaded from the official CDN, as in Auth0's SPA quickstart),
  handles the redirect callback, and toggles the UI based on
  `isAuthenticated()` / `getUser()`.
- `server.js` — tiny static file server (Node standard library only,
  no dependencies) serving `public/` on port 3000.

## Security note

This repo contains **no secrets**: only the Auth0 tenant domain (public) and a
placeholder Client ID. A Client ID is a public identifier, not a secret —
but keep your **Client Secret** (used only for server-side apps) out of
any repository.

## License

MIT
