const DEFAULT_IMAGE = "https://img.coomer.st/thumbnail/data/7f/a6/7fa6d689d69a33c21968f2ab00c198d3ee9ff3d506ac058947ce1dcf983972d3.jpg";
const DEFAULT_FALLBACK = "https://www.google.com/";
const chanceInput = document.getElementById("chance");
const imageInput = document.getElementById("imageUrl");
const fallbackInput = document.getElementById("fallbackUrl");
const status = document.getElementById("status");

async function load() {
  const v = await chrome.storage.local.get({
    imageUrl: DEFAULT_IMAGE, imageChance: 50, fallbackUrl: DEFAULT_FALLBACK
  });
  imageInput.value = v.imageUrl;
  chanceInput.value = v.imageChance;
  fallbackInput.value = v.fallbackUrl;
}
function validHttpUrl(value) {
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:"; }
  catch (_) { return false; }
}
document.getElementById("save").addEventListener("click", async () => {
  const chance = Number(chanceInput.value);
  if (!Number.isFinite(chance) || chance < 0 || chance > 100) {
    status.textContent = "Chance must be between 0 and 100.";
    return;
  }
  if (!validHttpUrl(imageInput.value.trim())) {
    status.textContent = "Enter a valid image URL.";
    return;
  }
  if (!validHttpUrl(fallbackInput.value.trim())) {
    status.textContent = "Enter a valid fallback page URL.";
    return;
  }
  await chrome.storage.local.set({
    imageUrl: imageInput.value.trim(),
    imageChance: chance,
    fallbackUrl: fallbackInput.value.trim()
  });
  status.textContent = "Saved. Open a new tab to test it.";
});
document.getElementById("reset").addEventListener("click", async () => {
  await chrome.storage.local.set({
    imageUrl: DEFAULT_IMAGE, imageChance: 50, fallbackUrl: DEFAULT_FALLBACK
  });
  await load();
  status.textContent = "Defaults restored.";
});
load();