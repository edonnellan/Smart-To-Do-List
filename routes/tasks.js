const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const request = require("request");
const { response } = require('express');

const categoryFinder = function (taskTitle) {
  const taskName = taskTitle.toLowerCase();
  if (taskName.includes("buy" || "groceries" || "amazon" || "order" || "purchase")) {
    return "Shopping";
  } else if (taskName.includes("watch" || "stream" || "movie" || "film" || "TV")) {
    return "Movies/TV";
  } else if (taskName.includes("read" || "book")) {
    return "Books";
  } else if (taskName.includes("eat" || "food")) {
    return "Restaurants";
  } else {
    return "Uncategorized";
  }
};

const categoryFinderApi = function (taskTitle, callback) {
  request(
    `https://customsearch.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ENGINE_ID}&q=${taskTitle}`,
    (err, response, body) => {
      let results = JSON.parse(body).items;
      console.log("results:", results)
      const data = [];
      for (let result of results) {
        data.push(result.snippet);
      }
      console.log(data);

      for (let element of data) {
        let output = "";
        console.log(element);
        if (
          element.includes("vegetable") ||
          element.includes("electronics") ||
          element.includes("fruit") ||
          element.includes("appliance") ||
          element.includes("product") ||
          element.includes("shop")
        ) {
          output = "Shopping";
          return callback(output);
        } else if (
          element.includes("stream") ||
          element.includes("movie") ||
          element.includes("television") ||
          element.includes("sitcom") ||
          element.includes("film") ||
          element.includes("watch")
        ) {
          output = "Movies/TV";
          return callback(output);
        } else if (
          element.includes("read") ||
          element.includes("book") ||
          element.includes("novel") ||
          element.includes("author")
        ) {
          output = "Books";
          return callback(output);
        } else if (
          element.includes("eat") ||
          element.includes("restaurant") ||
          element.includes("fast food")
        ) {
          output = "Restaurants";
          return callback(output);
        }
      }
      callback('Uncategorized');
    }
  );
};

const dbQuery = function(arr) {
  return db
    .query(`INSERT INTO tasks (title, category, is_important)
VALUES ($1, $2, $3) RETURNING *;`, arr)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log('cannot add task', err);
    });
};

const addTask = function(res, title, category, priority) {

  if (category === "Uncategorized") {
    category = categoryFinder(title);
  }

  if (category == "Uncategorized") {
    return categoryFinderApi(title, (result) => {
      const taskValues = [
        `${title}`,
        `${result}`,
        `${priority}`,
      ];
      console.log('taskValues;' , taskValues);
      const output = dbQuery(taskValues)
        .then(response => {
          return res.send(response);
        });
      console.log("API output:", output);
      return output;
    });
  }

  const values = [
    `${title}`,
    `${category}`,
    `${priority}`,
  ];
  const output = dbQuery(values)
  .then(response => {
    return res.send(response);
  });
  console.log("addtask output:", output);
  return output;
};

// add new task
router.post('/', (req, res) => {
  let priority = false;
  if (req.body.task_priority === "true") {
    priority = true;
  }
  console.log('priority: ', priority);
  const newTask = {
    title: req.body.task_name,
    category: req.body.task_category,
    priority: priority
  };
  const taskRes = addTask(res, newTask.title, newTask.category, newTask.priority);

});

// edit
router.post("/:id", (req, res) => {
  res.redirect("/");
  let priority = false;
  if (req.body.task_priority === "true") {
    priority = true;
  }
  const taskValues = [
    `${req.body.task_name}`,
    `${req.body.task_category}`,
    `${priority}`,
    `${req.body.task_id}`,
  ];
  db.query(
    `UPDATE tasks
      SET title=$1 , category=$2 , is_important=$3
      WHERE id=$4;
    `,
    taskValues,
    (err, result) => {
      if (err) {
        console.log("cannot update task", err);
      }
    }
  );
});

// delete
router.post("/:id/delete", (req, res) => {
  db.query(
    `UPDATE tasks SET is_deleted = true WHERE id=$1;`,
    [`${req.params.id}`],
    (err, result) => {
      res.redirect("/");
      if (err) {
        console.log("cannot delete task", err);
      }
    }
  );
});

// complete
router.post("/:id/complete", (req, res) => {
  console.log("complete route firing");
  db.query(
    `UPDATE tasks SET is_completed = true WHERE id=$1;`,
    [`${req.params.id}`],
    (err, result) => {
      res.redirect("/");
      if (err) {
        console.log("cannot complete task", err);
      }
    }
  );
});


router.post("/:id/uncomplete", (req, res) => {
  console.log("complete route firing");
  db.query(
    `UPDATE tasks SET is_completed = false WHERE id=$1;`,
    [`${req.params.id}`],
    (err, result) => {
      res.redirect("/");
      if (err) {
        console.log("cannot uncomplete task", err);
      }
    }
  );
});

module.exports = router;
