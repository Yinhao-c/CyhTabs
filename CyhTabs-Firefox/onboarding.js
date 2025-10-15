document.addEventListener('DOMContentLoaded', () => {
  // Load theme preference from Chrome storage
  chrome.storage.sync.get(['isLightMode'], (result) => {
    const isLightMode = result.isLightMode || false;
    if (isLightMode) {
      document.body.classList.add('light-mode');
    }
  });

  // Listen for theme changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.isLightMode) {
      const isLightMode = changes.isLightMode.newValue;
      if (isLightMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  });
});

