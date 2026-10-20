const DEFAULT_IMAGE = "https://img.coomer.st/thumbnail/data/7f/a6/7fa6d689d69a33c21968f2ab00c198d3ee9ff3d506ac058947ce1dcf983972d3.jpg";
const urlInput = document.getElementById("imageUrl");
const percentInput = document.getElementById("percent");
const percentLabel = document.getElementById("percentLabel");
const status = document.getElementById("status");
percentInput.addEventListener("input", () => percentLabel.textContent = percentInput.value + "%");
async function load() {
  const values = await chrome.storage.local.get({ imageUrl: DEFAULT_IMAGE, imagePercent: 90 });
  urlInput.value = values.imageUrl;
  percentInput.value = Math.min(100, Math.max(10, Number(values.imagePercent) || 90));
  percentLabel.textContent = percentInput.value + "%";
}
document.getElementById("save").addEventListener("click", async () => {
  const url = urlInput.value.trim();
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Use an HTTP or HTTPS image URL.");
  } catch (_) {
    status.textContent = "Enter a valid image URL beginning with https:// or http://.";
    return;
  }
  await chrome.storage.local.set({ imageUrl: url, imagePercent: Number(percentInput.value) });
  status.textContent = "Settings saved. Open a new tab to see the changes.";
});
document.getElementById("reset").addEventListener("click", async () => {
  await chrome.storage.local.set({ imageUrl: DEFAULT_IMAGE, imagePercent: 90 });
  await load();
  status.textContent = "Defaults restored.";
});
load();