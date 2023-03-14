const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


const addTask = function(title, category, priority) {
  const taskValues = [
    `${title}`,
    `${category}`,
    `${priority}`,
  ];
   db
    .query(`INSERT INTO tasks (title, category, priority)
  VALUES ($1, $2, $3) RETURNING *;`, taskValues)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log('cannot add task', err);
    });
 };

router.post('/', (req, res) => {
  const newTask = {
    title: req.body.task_name,
    category: req.body.task_category,
    priority: req.body.task_priority
  }
  res.json({ newTask });

addTask(newTask.title, newTask.category, newTask.priority);

});

module.exports = router;
