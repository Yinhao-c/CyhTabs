// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open the onboarding page when the extension is first installed
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  }
});

// Handle icon updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateIcon') {
    const iconPath = request.isLightMode ? 'icons/icon128_light.png' : 'icons/icon128_dark.png';
    chrome.action.setIcon({ path: iconPath });
  }
});
