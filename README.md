# Task Tracker

Toy app for the "Testing Bug Fixes with AI, Playwright, and OpenTabs" workshop.

## Run

```
pip install -r requirements.txt
python app.py
```

Opens on http://localhost:5050

## API

- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create task, body `{"title": "..."}`
- `PATCH /api/tasks/<id>` — toggle completed
- `DELETE /api/tasks/<id>` — delete task
- `GET /api/tasks/summary` — `{"active": N, "completed": N, "total": N}`

## The bug (workshop ticket)

**Issue:** Active task count on the home page is wrong. With 2 incomplete tasks and 1
completed task seeded, the summary shows 1 active instead of 2. Completed count is
right, so it's easy to miss by eye — the UI list itself renders correctly, only the
count is off. Confirming this needs checking the `/api/tasks/summary` response, not
just looking at the page.

**Fix:** `summary()` in `app.py` used `t["completed"]` (truthy) to count active tasks
instead of `not t["completed"]`. One-line filter fix.
