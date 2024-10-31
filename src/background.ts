chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.sync.set({ popupEnabled: false });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.popupEnabled) {
    console.log(`Popup enabled state changed: ${changes.popupEnabled.newValue}`);
  }
});
