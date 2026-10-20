# Nikki — Devotion PWA

A static installable Progressive Web App with four user-triggered effects, including Windows desktop notifications.

## Publish it with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**, then save.
4. Wait for the Pages URL to appear. It will usually be `https://kakapipos.github.io/Nikki/`.
5. Open that URL in Microsoft Edge. Use **… → Apps → Install this site as an app**.

## Windows notifications

Press **SEND 3 WINDOWS NOTIFICATIONS** inside the app and allow notifications when Edge asks. Windows must also allow notifications for Microsoft Edge. These are app-triggered notifications through the browser's Notification API and service worker; this repository does **not** include a server-side Web Push service, so it cannot deliver unsolicited notifications when the app has no active browser/service-worker context.

## Image

The app displays the image from this URL:
https://img.coomer.st/thumbnail/data/7f/a6/7fa6d689d69a33c21968f2ab00c198d3ee9ff3d506ac058947ce1dcf983972d3.jpg

The image host must remain reachable and the device needs an internet connection to load the image. The app interface itself can be cached by the service worker.

## Controls and privacy

All four effects are user-triggered. The image grid is capped at 24 copies. The slideshow and notification sequence can be stopped using **Emergency Stop / Reset**. Nothing is added to Windows startup, and the app does not force itself to reopen.

## Files

- `index.html` — interface and four payloads
- `manifest.json` — install metadata
- `sw.js` — app-shell caching and notification support
- `icon.svg` — app icon
