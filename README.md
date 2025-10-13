# CyhTabs — Browser Extension 🧩



**CyhTabs** helps professionals and power users manage browser workflows by saving, naming, and restoring tab groups — fast, reliable, and unobtrusive. ✨

---

## 📌 Quick overview
- **Capture**: Save the current window's tabs as a named *tab group*. 🗂️
- **Persist**: Groups are stored locally for later restoration. 💾
- **Restore**: Reopen a saved group with one click to recover your workspace. 🔁
- **Lightweight**: Small footprint and minimal permissions — built for productivity. ⚡

> Note: A Firefox build for **Firefox Developer Edition** is available for testing. A signed AMO (addons.mozilla.org) release is planned and may be under review. For immediate use, install on Chrome/Edge via unpacked developer install (see Usage). 🔧

---

## 📚 Table of contents
- Quick start
- Supported platforms
- Features
- Installation (detailed)
- User workflow
- Developer & Packaging Guide (summary)
- Storage schema & migration guidance
- Troubleshooting & FAQ
- Reporting issues & support
- License & copyright

---

## 🚀 Quick start
1. Download the release archive: https://github.com/Yinhao-C/CyhTabs/releases/download/v1.0.0/cyhtabs-1.0.0.zip ⬇️
2. Extract the archive to a folder.
3. **Chrome / Edge**: Open `chrome://extensions/`, enable **Developer mode**, click **Load unpacked**, and select the folder containing `manifest.json`.
4. Click the toolbar icon to open the popup and save your first group. 🎉

**Firefox Developer Edition**: See the Installation (detailed) section for manual temporary install steps. ⚠️ Temporary installs are removed on restart unless signed via AMO.

---

## 🔧 Supported platforms
- **Chrome** — supported via unpacked install (developer).
- **Edge** — supported via unpacked install (developer).
- **Firefox Developer Edition** — manual temporary installs supported for testing; production distribution should be via AMO (signed).

---

## ✨ Features (at a glance)
- Save & name tab groups (title + timestamp). 🏷️
- One‑click restore (open all group tabs). 🔁
- Lightweight popup UI for fast access. 🖱️
- Onboarding flow for first-time users. 🧭
- Local-only storage by default (no remote servers). 🔒

---

## 🔁 Installation (detailed)

### Chrome / Edge — Load unpacked (developer / immediate use)
1. Download and extract the release ZIP file.
2. In the browser address bar navigate to `chrome://extensions/`.
3. Toggle **Developer mode** on (top-right).
4. Click **Load unpacked** and select the folder that contains `manifest.json`.
5. Pin the extension to the toolbar for quick access.
6. Test: open several tabs, click the CyhTabs icon → Save group → name it → verify it appears in the list. Click the saved entry to restore.

**Developer tips**
- After editing source files, click **Reload** on the extension card to pick up changes.
- Use popup inspector (right‑click popup → Inspect) and Service Worker inspector (`chrome://extensions` → Service Worker → Inspect) for debugging (MV3). 🐛

### Firefox Developer Edition — Load Temporary Add-on (manual testing)
1. Open Firefox Developer Edition and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and choose the extension folder's `manifest.json`.
3. The add-on is loaded temporarily — it will be removed on restart. For long-term distribution, publish a signed XPI via AMO. 🔐

**AMO submission notes**
- Provide a clear permission justification and a privacy statement if your extension reads or stores user data.
- Include screenshots and the required metadata. Respond promptly to reviewer requests. ⏱️

---

## 🧭 User workflow (typical)
1. Click the CyhTabs icon in the toolbar.
2. Click Save group (or equivalent) — provide a descriptive name.
3. The group appears in the saved list with timestamp and optional metadata (tab count).
4. Click the group to restore tabs — option to open in a new window or current window (configurable).
5. Manage groups: rename, delete, or export (if available).

---

## 🛠️ Developer & Packaging Guide (concise summary)
- Keep `manifest.json` version in sync with releases.
- Use semantic versioning (MAJOR.MINOR.PATCH).
- Zip only the extension root (i.e., the folder that contains `manifest.json`) when creating release artifacts:

```bash
cd path/to/extension-root
zip -r cyhtabs-1.0.0.zip *
```

- Prepare store assets: high-res screenshots, icons, and a privacy statement (if needed).
- For Firefox AMO, ensure compatibility with WebExtensions APIs and avoid Chrome-only private APIs or provide fallbacks. 🔁

**Recommended CI step (optional)**
- Run linting (ESLint) and simple smoke test (load unpacked and verify function) before tagging a release. ✅

---

## 🗂️ Storage schema & migration guidance (recommended)
Use a versioned storage schema so migrations can be run safely:

```json
{
  "meta": { "schemaVersion": 1 },
  "groups": [
    {
      "id": "uuid-v4",
      "name": "Research - AI",
      "createdAt": 1690000000000,
      "tabs": [
        {"title":"Paper","url":"https://example.com/paper","favIconUrl":"https://..."}
      ]
    }
  ]
}
```

- When changing structure, increment `schemaVersion` and implement a migration routine at runtime to convert older data to the new format. 🔧

---

## 🩺 Troubleshooting & FAQ (quick)
### Q: Popup is blank / shows nothing.
**A:** Right‑click the popup → Inspect. Check the console for JS errors or missing resource paths. Verify `manifest.json` CSP and script references. 🧐

### Q: Saved groups disappear after restart.
**A:** Check storage type — prefer `chrome.storage.local` for persistence. Inspect Application → Storage → `chrome.storage` for keys. Ensure no startup code clears storage.

### Q: Background logic not running (MV3/service worker).
**A:** MV3 background runs in a service worker that may unload when idle. Ensure event-driven listeners and rehydrate state when the worker restarts. Use the Service Worker inspector for logs. 🔍

### Q: Permission errors (tabs / storage).
**A:** Confirm `manifest.json` lists the needed permissions. After edits, reload the extension. Avoid requesting more permissions than necessary.

### Q: Issues with Firefox review / AMO.
**A:** Common causes: undeclared data handling, insufficient permission justification, or missing privacy docs. Provide clear explanations and fix reviewer comments promptly.

---

## 📬 Reporting issues & getting help
When filing an issue or emailing support, include:
- Browser name & version (e.g., Chrome 94.0.4606.61)
- Steps to reproduce & expected vs actual behavior
- Console logs or a short video/GIF demonstrating the issue
- Extension version (`manifest.json` `version`) and release archive used

Email: **yihac1@outlook.com** — I will respond and help triage. 🙏

---

## 📜 License & copyright
This project is licensed under the **Apache License 2.0**. See `LICENSE` for full text.

© 2025 Yinhao Chen — All rights reserved where applicable; contributions are accepted under the Apache License 2.0.

---

*Thank you for trying CyhTabs — designed for speed, clarity, and control. 🚀*
