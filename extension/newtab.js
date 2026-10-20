const DEFAULT_IMAGE = "https://img.coomer.st/thumbnail/data/7f/a6/7fa6d689d69a33c21968f2ab00c198d3ee9ff3d506ac058947ce1dcf983972d3.jpg";

async function init() {
  const settings = await chrome.storage.local.get({
    imageUrl: DEFAULT_IMAGE,
    imageChance: 50,
    fallbackUrl: "https://www.google.com/"
  });
  const chance = Math.min(100, Math.max(0, Number(settings.imageChance) || 0));

  // Decide independently each time a new tab is opened.
  if (Math.random() * 100 >= chance) {
    const fallback = settings.fallbackUrl || "https://www.google.com/";
    location.replace(fallback);
    return;
  }

  const img = document.getElementById("feature");
  img.src = settings.imageUrl || DEFAULT_IMAGE;
  img.addEventListener("error", () => {
    document.body.textContent = "Image failed to load.";
    document.body.style.cssText = "color:white;background:black;font:16px system-ui;display:grid;place-items:center";
  }, { once: true });
}
init();