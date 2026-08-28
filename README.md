# Task Tracker

Sample app for the "How AI Is Reshaping Testing" workshop demo.

## Run

```
uv venv
uv pip install -r requirements.txt
uv run python app.py
```

Or plain pip:

```
pip install -r requirements.txt
python app.py
```

Opens on http://localhost:5050

## API

- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create task, body `{"title": "...", "priority": "low|medium|high"}`
- `PATCH /api/tasks/<id>` — toggle completed
- `DELETE /api/tasks/<id>` — delete task
- `GET /api/tasks/summary` — `{"active": N, "completed": N, "total": N}`
