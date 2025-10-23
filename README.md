# CyhTabs — Browser Extension 🧩

**CyhTabs** helps professionals and power users manage browser workflows by saving, naming, and restoring tab groups — fast, reliable, and unobtrusive. ✨

---

> ⚠️ **Update:** CyhTabs is now published on Firefox Add-ons (AMO). Install the official Firefox add-on directly from the Mozilla Add-ons site: https://addons.mozilla.org/en-US/firefox/addon/cyhtabs/
>
> ⚠️ Update: CyhTabs is now published on Microsoft Edge Add-ons.
Install the official Edge extension directly from the Microsoft Add-ons site:
👉 https://microsoftedge.microsoft.com/addons/detail/cyhtabs/gogdjogbmnmpibgnhekhbdcpdimojcbb

>
> This project was developed by the author with minor AI assistance to fix syntax errors and improve code comments.

---

## 📌 Quick overview
- **Capture**: Save the current window's tabs as a named *tab group*. 🗂️  
- **Persist**: Groups are stored locally for later restoration. 💾  
- **Restore**: Reopen a saved group with one click to recover your workspace. 🔁  
- **Lightweight**: Small footprint and minimal permissions — built for productivity. ⚡

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
1. **Firefox (recommended / stable)** — Install from Mozilla Add-ons: https://addons.mozilla.org/en-US/firefox/addon/cyhtabs/  
2. For development or local testing on Chromium-based browsers:
   - Download the release archive from the repository releases page: https://github.com/Yinhao-C/CyhTabs/releases  
   - Extract the archive to a folder.
   - Open `chrome://extensions/`, enable **Developer mode**, click **Load unpacked**, and select the folder containing `manifest.json`.
3. Click the toolbar icon to open the popup and save your first group. 🎉

---

## 🔧 Supported platforms
- **Firefox (official)** — Installable via AMO (signed, production release).  
- **Microsoft Edge (official)** — Installable via Microsoft Edge Add-ons (signed, production release).
-**Chrome** — Supported via unpacked developer install (for now). Consider publishing to the Chrome Web Store for broader distribution.

---

## ✨ Features (at a glance)
- Save & name tab groups (title + timestamp). 🏷️  
- One-click restore (open all group tabs). 🔁  
- Lightweight popup UI for fast access. 🖱️  
- Onboarding flow for first-time users. 🧭  
- Local-only storage by default (no remote servers). 🔒

---

## 🔁 Installation (detailed)

### Firefox — Install from AMO (stable)
1. Visit the official AMO listing: https://addons.mozilla.org/en-US/firefox/addon/cyhtabs/  
2. Click **Add to Firefox** and follow the browser prompts to install.  
3. Pin the extension to the toolbar for quick access.  
4. Test: open several tabs, click the CyhTabs icon → Save group → name it → verify it appears in the list. Click the saved entry to restore.

> Note: The AMO release is signed and persists across restarts — no temporary developer install is required for normal use.


### Microsoft Edge — Install from Add-ons (stable)

1.	Visit the official Microsoft Edge Add-ons listing: https://microsoftedge.microsoft.com/addons/detail/cyhtabs/gogdjogbmnmpibgnhekhbdcpdimojcbb
	2.	Click Get and follow the Edge prompts to install.
	3.	Pin the extension to the toolbar for quick access.
	4.	Test: open several tabs, click the CyhTabs icon → Save group → name it → verify it appears in the list. Click the saved entry to restore.

> Note: The Microsoft Edge Add-ons release is fully signed and persists across restarts — no temporary developer install is required for normal use.

### Chrome / Edge — Load unpacked (developer / immediate use)
1. Download and extract the release ZIP file from the releases page.  
2. In the browser address bar navigate to `chrome://extensions/`.  
3. Toggle **Developer mode** on (top-right).  
4. Click **Load unpacked** and select the folder that contains `manifest.json`.  
5. Pin the extension to the toolbar for quick access.  
6. Test: open several tabs, click the CyhTabs icon → Save group → name it → verify it appears in the list. Click the saved entry to restore.

**Developer tips**
- After editing source files, click **Reload** on the extension card to pick up changes.
- Use popup inspector (right-click popup → Inspect) and Service Worker inspector (`chrome://extensions` → Service Worker → Inspect) for debugging (MV3). 🐛

---

## 🧭 User workflow (typical)
1. Click the CyhTabs icon in the toolbar.  
2. Click **Save group** — provide a descriptive name.  
3. The group appears in the saved list with timestamp and optional metadata (tab count).  
4. Click the group to restore tabs — option to open in a new window or current window (configurable).  
5. Manage groups: rename, delete, or export (if available).

---

## 🩺 Troubleshooting & FAQ (quick)
### Q: Popup is blank / shows nothing.
**A:** Right-click the popup → Inspect. Check the console for JS errors or missing resource paths. Verify `manifest.json` CSP and script references. 🧐

### Q: Saved groups disappear after restart.
**A:** Check storage type — prefer `chrome.storage.local` for persistence. Inspect Application → Storage → `chrome.storage` for keys. Ensure no startup code clears storage.

### Q: Background logic not running (MV3/service worker).
**A:** MV3 background runs in a service worker that may unload when idle. Ensure event-driven listeners and rehydrate state when the worker restarts. Use the Service Worker inspector for logs. 🔍

### Q: Permission errors (tabs / storage).
**A:** Confirm `manifest.json` lists the needed permissions. After edits, reload the extension. Avoid requesting more permissions than necessary.

### Q: Issues with Firefox review / AMO.
**A:** Common causes: undeclared data handling, insufficient permission justification, or missing privacy docs. Provide clear explanations and fix reviewer comments promptly. Now that CyhTabs is published on AMO, follow reviewer guidance and update your AMO listing / privacy notes if reviewers request changes.

---

## 📬 Reporting issues & getting help
When filing an issue or emailing support, include:
- Browser name & version (e.g., Firefox 120.0 / Chrome 116.0.5845.111)  
- Steps to reproduce & expected vs actual behavior  
- Console logs or a short video/GIF demonstrating the issue  
- Extension version (`manifest.json` `version`) and release archive used

Email: **yihac1@outlook.com** — I will respond and help triage. 🙏

---


## 🔢 Storage schema & migration guidance
- Primary storage: `chrome.storage.local` (or the equivalent WebExtension storage on Firefox).  
- When changing schema keys, provide a migration path on startup: detect older schema versions and transform entries to the new schema. Always back up user data before destructive migrations.

---

## ⚙️ Troubleshooting & support notes for reviewers
- Include a clear privacy statement describing that all data is stored locally and not sent to remote servers (if applicable).  
- In the AMO developer listing, fill out the required permission justification fields precisely for `tabs` and `storage`.  
- Attach a short demo GIF and reproduction steps to speed up reviewer acceptance.

---

## License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0).  
You may use, modify, and distribute this software under the terms of the MPL-2.0.

Any modifications made to the covered source files must be made publicly available under the same license. Binary or compiled forms may be distributed under your own terms, provided that the source code of the modified files remains accessible as required by the MPL.

Copyright © 2025 Yinhao Chen.  
For questions, contributions, or licensing inquiries, contact: yihac1@outlook.com

---

*Thank you for trying CyhTabs — designed for speed, clarity, and control. 🚀*
