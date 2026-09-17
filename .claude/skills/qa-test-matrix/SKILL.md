---
name: qa-test-matrix
description: Run a systematic input/state test matrix against a task-tracker-style web form instead of ad hoc poking. Use when asked to thoroughly test an app's add/edit form, or when a cold freeform test pass isn't trusted to have covered everything.
---

# QA test matrix

Ad hoc "test this app" passes are inconsistent — what gets caught depends on what the tester happens to think to try. This skill replaces improvisation with a fixed checklist, so results are repeatable across runs.

Given a URL, run every case below via real browser interaction (Playwright MCP browser tools — not shell/curl, not guessing from reading source). For each case, verify the *actual outcome*, not just that nothing crashed.

## 1. Title — special characters
Add one task per input, then confirm the title shown in the list matches exactly what was typed:
- Straight apostrophe: `Don't forget the milk`
- Hyphen as separator: `Buy milk - 2%`
- Double quotes: `Say "hello"`
- Ampersand: `Salt & pepper`
- Emoji/unicode: `Ship it 🚀`
- HTML-looking input: `<b>urgent</b>`
- Leading/trailing spaces: `"   padded title   "` (check both ends survive)
- Whitespace-only: `"   "` (should be rejected, not saved as blank)
- Very long title (200+ chars)

## 2. Priority field
For each of Low / Medium / High:
- Select it, submit, and confirm the badge on the new task shows *that exact* priority — not just that a badge appeared.

## 3. Completion state consistency
- Note the summary line's active/completed/total before touching anything.
- Check one task. Re-read the summary. Confirm active decreased by 1, completed increased by 1, total unchanged — compute the expected numbers yourself first, don't just eyeball it.
- Uncheck it. Confirm summary returns to the original numbers.
- Repeat until all tasks are checked, then all unchecked, verifying at every step.

## 4. Filters
- Click each of All / Active / Completed with a mix of checked and unchecked tasks present.
- Confirm the visible list matches the tab's name exactly (Active tab shows zero completed tasks, etc.) — count them, don't skim.

## 5. Delete
- Delete a task. Confirm it's gone from the list AND the summary total decreased.

## 6. Validation
- Submit with an empty title. Confirm it's rejected.
- Submit with no priority selected. Confirm it's rejected, and note whether there's any visible explanation of why.

## 7. Static content
- Read the browser tab title, page heading, and subtitle text character-by-character for typos — don't skim.

## Report format
List every case above as PASS or FAIL. For each FAIL: exact input used, expected result, actual result. No case may be marked PASS without having actually been executed via the browser tools this run.
