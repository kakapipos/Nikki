const DEFAULT_IMAGE = "https://img.coomer.st/thumbnail/data/7f/a6/7fa6d689d69a33c21968f2ab00c198d3ee9ff3d506ac058947ce1dcf983972d3.jpg";
const img = document.getElementById("feature");
const stage = document.getElementById("stage");
const controls = document.getElementById("controls");
const hiddenPanel = document.getElementById("hidden");
const error = document.getElementById("error");
let imageUrl = DEFAULT_IMAGE;

function setVisible(visible) {
  img.hidden = !visible;
  controls.hidden = !visible;
  hiddenPanel.hidden = visible;
}
async function init() {
  const settings = await chrome.storage.local.get({ imageUrl: DEFAULT_IMAGE, imagePercent: 90 });
  imageUrl = settings.imageUrl || DEFAULT_IMAGE;
  const percent = Math.min(100, Math.max(10, Number(settings.imagePercent) || 90));
  stage.style.setProperty("--image-percent", percent + "%");
  img.src = imageUrl;
  img.addEventListener("error", () => { error.hidden = false; }, { once: true });
}
document.getElementById("hide").addEventListener("click", () => setVisible(false));
document.getElementById("show").addEventListener("click", () => { error.hidden = true; setVisible(true); });
document.getElementById("fullscreen").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (_) {
    error.textContent = "Fullscreen was blocked by the browser. Use the browser's fullscreen shortcut instead.";
    error.hidden = false;
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else setVisible(false);
  }
});
init();