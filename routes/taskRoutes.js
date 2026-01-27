const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

/* GET all tasks */
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY deadline ASC",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

/* ADD task */
router.post("/", verifyToken, (req, res) => {
  const { title, descriptions, deadline  } = req.body;

  db.query(
    "INSERT INTO tasks (user_id, title, descriptions, deadline ) VALUES (?, ?, ?, ?)",
    [req.user.id, title, descriptions, deadline ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task added" });
    }
  );
});

/* UPDATE task title */
router.put("/:id", verifyToken, (req, res) => {
  const { title, descriptions, deadline } = req.body;

  db.query(
    "UPDATE tasks SET title=?, descriptions=?, deadline=?  WHERE id=? AND user_id=?",
    [title, descriptions, deadline,  req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated" });
    }
  );
});

/* TOGGLE completed */
router.patch("/:id", verifyToken, (req, res) => {
  db.query(
    "UPDATE tasks SET completed = !completed WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task status updated" });
    }
  );
});

/* DELETE task */
router.delete("/:id", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task deleted" });
    }
  );
});

module.exports = router;
