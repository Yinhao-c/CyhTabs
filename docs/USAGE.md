# Usage — CyhTabs (Detailed)

This usage guide provides step‑by‑step instructions and examples for end users and administrators.

---

## Quick checklist before using
- Ensure you have an appropriate browser (Chrome/Edge or Firefox Developer Edition).
- Download and extract the release package.
- Locate the folder containing `manifest.json` for the Load unpacked / Load Temporary Add-on steps.

---

## Example: saving a group (step-by-step)
1. Open a browser window with multiple tabs relevant to a task (e.g., research, project work).
2. Click the CyhTabs toolbar icon.
3. In the popup, click **Save group**.
4. Provide a descriptive name (e.g., "Q4 Research - competitors") and confirm.
5. Verify the group appears with tab count and timestamp.

## Example: restoring a group
1. Click the CyhTabs icon.
2. From the saved list, click the desired group.
3. Confirm whether to restore in a new window or the current window (if option presented).
4. Tabs will open and the context is restored.

---

## Export / Import (recommended implementation notes)
- Export: serialize storage to JSON and present a file download (`URL.createObjectURL` + anchor click).
- Import: upload JSON, validate structure, and merge or replace local data with user confirmation. 🔁

## Permission rationale
- `tabs`: required to list and open tabs.
- `storage`: required to persist saved groups.
Only request additional permissions if features require them and document reasons in README.

---

## Example manifest.json snippet (permissions)
```json
{
  "manifest_version": 3,
  "name": "CyhTabs",
  "version": "1.0.0",
  "permissions": ["tabs", "storage"],
  "action": {
    "default_popup": "popup.html"
  }
}
```

---

## Best practices
- Keep UI minimal and accessible (keyboard navigation).
- Provide confirmations for destructive actions (delete/overwrite).
- Test migration code on sample datasets before release.
