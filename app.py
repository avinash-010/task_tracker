from itertools import count

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

tasks = []
_id_counter = count(1)


def seed():
    tasks.append({"id": next(_id_counter), "title": "Buy milk", "completed": False, "priority": "low"})
    tasks.append({"id": next(_id_counter), "title": "Write talk outline", "completed": False, "priority": "high"})
    tasks.append({"id": next(_id_counter), "title": "Test OpenTabs demo", "completed": False, "priority": "medium"})


seed()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/tasks", methods=["GET"])
def list_tasks():
    return jsonify(tasks)


@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    task = {
        "id": next(_id_counter),
        "title": data["title"],
        "completed": False,
        "priority": data.get("priority", "medium"),
    }
    tasks.append(task)
    return jsonify(task), 201


@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def toggle_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            return jsonify(task)
    return jsonify({"error": "not found"}), 404


@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return "", 204


@app.route("/api/tasks/summary", methods=["GET"])
def summary():
    active = sum(1 for t in tasks if not t["completed"])
    completed = sum(1 for t in tasks if t["completed"])
    print(f"DEBUG summary: tasks={tasks}")
    return jsonify({"active": active, "completed": completed, "total": len(tasks)})


if __name__ == "__main__":
    app.run(debug=True, port=5050)
