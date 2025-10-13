# FAQ — CyhTabs (Comprehensive)

## Q: The popup shows nothing / blank
**A:** Open popup inspector (right‑click → Inspect) and look for console errors. Confirm that `popup.html` references the correct script and CSS paths and that CSP is not blocking execution.

## Q: Saved groups are gone after a browser restart
**A:** Check `chrome.storage.local` (Application → Storage) for the keys. Ensure that startup code doesn't reset or migrate data incorrectly.

## Q: Background tasks aren't executed reliably (MV3)
**A:** The MV3 background is a service worker. It may unload when idle — design the extension to be event-driven and rehydrate state on activation. Use Service Worker inspector for debugging.

## Q: I got a permissions error for `tabs` or `storage`
**A:** Verify `manifest.json` includes those permissions. After changes, reload the extension. Do not request unnecessary permissions — that increases reviewer scrutiny.

## Q: AMO rejected my submission. What next?
**A:** Carefully read the reviewer message. Common issues include missing privacy information, undeclared data practices, or unsupported APIs. Fix, document, and re-submit. Responding fast shortens review cycles.

## Still stuck?
Collect logs, a short screen recording, and the extension version, then email **yihac1@outlook.com** — include steps to reproduce and any relevant console output. 🙏
