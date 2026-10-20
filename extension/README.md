# Nikki New Tab extension

A minimal Edge/Chromium extension. Every new tab independently rolls the configured chance:
- If the roll succeeds, it displays the configured image as large as possible while preserving its aspect ratio.
- Otherwise, it opens the configured fallback website.

## Install in Microsoft Edge

1. Download the repository ZIP and extract it.
2. Open `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `extension` folder.
5. Open the extension's **Details → Extension options** to set the chance, image URL, and fallback URL.

## Important browser limitation

An extension that replaces the New Tab page cannot return to Edge's internal `edge://newtab` page as a fallback. Set the fallback URL to the regular start-page website you want instead. The extension does not force browser-wide fullscreen; it shows the image edge-to-edge in the new-tab page without extra controls.