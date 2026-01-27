const db = require("../config/db");

// CREATE TASK
exports.createTask = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Task title required" });
  }

  const query = "INSERT INTO tasks (user_id, title) VALUES (?, ?)";

  db.query(query, [userId, title], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating task" });
    }
    res.status(201).json({ message: "Task added" });
  });
};

// GET TASKS
exports.getTasks = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM tasks WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tasks" });
    }
    res.json(results);
  });
};
