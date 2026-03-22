const SETTINGS_KEY = "settings";
const DEFAULT_SETTINGS = {
  enabled: true,
  delayMs: 1000,
};

const enabledEl = document.getElementById("enabled");
const delayEl = document.getElementById("delayMs");
const saveBtn = document.getElementById("saveBtn");

async function loadSettings() {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  const settings = { ...DEFAULT_SETTINGS, ...(result[SETTINGS_KEY] || {}) };

  enabledEl.checked = settings.enabled;
  delayEl.value = settings.delayMs;
}

async function saveSettings() {
  const settings = {
    enabled: enabledEl.checked,
    delayMs: Number(delayEl.value) || 1000,
  };

  await chrome.storage.local.set({
    [SETTINGS_KEY]: settings,
  });

  saveBtn.textContent = "Saved!";
  setTimeout(() => {
    saveBtn.textContent = "Save Settings";
  }, 1000);
}

saveBtn.addEventListener("click", saveSettings);
loadSettings();
