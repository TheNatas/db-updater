import sqlite3

from flask import Flask, redirect, render_template, request, jsonify

app = Flask(__name__)

# Enable templates to be auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

con = sqlite3.connect('tarefas.db', check_same_thread=False)
con.row_factory = sqlite3.Row
db = con.cursor()

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return redirect("/")
    else:
        return render_template("index.html")

@app.route('/server', methods=["GET", "POST"])
def server():
  if request.method == "POST":
    db.execute("INSERT INTO tarefa (descricao, data) VALUES (?, DATE('now'))", (request.get_data(as_text=True),))
    db.execute("SELECT * FROM tarefa")
    arr = []
    for row in db:
      arr.append({row["codigo"], row["descricao"], row["data"]})
    return jsonify(db)
  else:
    return render_template("index.html")