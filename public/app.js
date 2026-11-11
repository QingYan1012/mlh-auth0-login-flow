// Minimal Auth0 login flow (Single Page Application) using @auth0/auth0-spa-js.
// Follows the Auth0 SPA Getting Started guide:
// https://auth0.com/docs/quickstart/spa/vanillajs
//
// ── SETUP ──────────────────────────────────────────────────────────────────
// 1. In the Auth0 Dashboard, create an Application of type
//    "Single Page Web Application".
// 2. Replace AUTH0_CLIENT_ID below with that application's Client ID.
// 3. In the application settings, set all three of these to http://localhost:3000:
//      Allowed Callback URLs:  http://localhost:3000
//      Allowed Logout URLs:    http://localhost:3000
//      Allowed Web Origins:    http://localhost:3000
// 4. Run: npm install && npm start, then open http://localhost:3000
// ────────────────────────────────────────────────────────────────────────────

const AUTH0_DOMAIN = "qingyan.jp.auth0.com";
// TODO: replace with your Auth0 application's Client ID (Dashboard → Applications → your app).
const AUTH0_CLIENT_ID = "AUTH0_CLIENT_ID";

let auth0Client = null;

const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const loginBtn = $("btn-login");
const logoutBtn = $("btn-logout");

function setStatus(text) {
  statusEl.textContent = text;
}

async function updateUI() {
  const isAuthenticated = await auth0Client.isAuthenticated();

  loginBtn.disabled = isAuthenticated;
  logoutBtn.disabled = !isAuthenticated;

  if (!isAuthenticated) {
    $("profile").style.display = "none";
    setStatus("You are not logged in. Click “Log in with Auth0” to sign in via Universal Login.");
    return;
  }

  const user = await auth0Client.getUser();
  $("avatar").src = user.picture || "";
  $("nickname").textContent = user.nickname || user.name || "";
  $("email").textContent = user.email || "";
  $("profile-json").textContent = JSON.stringify(user, null, 2);
  $("profile").style.display = "block";
  setStatus(`Logged in as ${user.nickname || user.name || user.email}.`);
}

async function init() {
  if (!window.auth0) {
    setStatus("Failed to load the Auth0 SPA SDK from the CDN. Check your network connection.");
    return;
  }

  if (AUTH0_CLIENT_ID === "AUTH0_CLIENT_ID") {
    $("warning").style.display = "block";
  }

  auth0Client = await window.auth0.createAuth0Client({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });

  // Handle the redirect back from Auth0 Universal Login.
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  loginBtn.addEventListener("click", () => {
    auth0Client.loginWithRedirect({
      authorizationParams: { redirect_uri: window.location.origin },
    });
  });

  logoutBtn.addEventListener("click", () => {
    auth0Client.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  await updateUI();
}

init().catch((err) => {
  console.error(err);
  setStatus(`Error: ${err.message || err}`);
});
