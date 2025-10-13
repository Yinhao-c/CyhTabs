# Developer Guide — CyhTabs (Authoritative) 🛠️

This document provides a practical workflow for contributors and maintainers: local iteration, debugging, schema management, packaging, and submission guidelines.

---

## Repository layout (recommended)
```
/manifest.json
/popup.html
/popup.js
/popup.css
/background.js
/onboarding.html
/onboarding.js
/onboarding.css
/icons/
/docs/
LICENSE
README.md
```

---

## Local development & debugging
- Load as an unpacked extension (see README → Quick start).
- Popup debugging: right‑click popup → **Inspect**.
- Background (MV3) service worker: `chrome://extensions` → Service Worker → **Inspect**.
- Use `console.debug` guarded by a DEBUG flag to limit noise in production logs. 🧯

### Useful tips
- Add a `DEBUG` toggle in your code to produce structured logs when needed.
- Implement a diagnostic export that collects `chrome.storage` snapshot and recent console messages for triage. 🗃️

---

## Storage schema versioning & migrations
Adopt a versioned schema so you can apply safe migrations. Example structure (conceptual):

- meta.schemaVersion: 1
- groups: array of objects, each with id, name, createdAt, tabs[]

When bumping `schemaVersion`:
1. Implement an on‑startup migration routine.
2. Verify conversion on a test dataset.
3. Maintain backward compatibility where feasible. ✅

---

## Packaging & releases — checklist ✅
- Update `manifest.json` `version` (semantic).
- Run linters and basic unit tests (if present).
- Zip the extension root (no parent folder):
  - `zip -r cyhtabs-1.0.0.zip *`
- Upload the zip to GitHub Releases.
- Prepare screenshots and privacy notes for store submissions.

---

## Store-specific notes
### Chrome Web Store
- Prepare marketing assets (screenshots, short description).
- Pay attention to policy sections around user data and permissions. 🔒

### Firefox AMO
- AMO requires signing; reviewers may request clarifications. Respond promptly to speed approval.
- Avoid Chrome-only private APIs or provide fallbacks.

---

## Continuous Integration suggestions (optional)
- Add GitHub Actions to run lint and create release zips on tag.
- Optionally run automated smoke tests by launching a headless Chromium and verifying API availability.

---

## Contribution workflow
- Open an issue before large changes.
- Small fixes: create a PR with a clear description and testing steps.
- Use feature branches and meaningful commit messages. 📝

---

## Security & privacy considerations
- Minimize permissions. Document any data access in README and privacy docs.
- Do not transmit saved tab data to third-party servers without explicit user consent. 🔐

---

If you want, I can also generate a sample `manifest.json` template or a GitHub Actions workflow to automate releases and zip creation.
