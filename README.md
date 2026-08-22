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
