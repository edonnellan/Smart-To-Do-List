const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const request = require("request");
const axios = require('axios');


const categoryFinder = function(taskTitle) {
  const taskName = taskTitle.toLowerCase();
  if (taskName.includes('buy') ||
    taskName.includes('groceries') ||
    taskName.includes('amazon') ||
    taskName.includes('order') ||
    taskName.includes('purchase')
  ) {
    return 'products';
  } else if (
    taskName.includes('watch') ||
    taskName.includes('stream') ||
    taskName.includes('movie') ||
    taskName.includes('film') ||
    taskName.includes('TV')
  ) {
    return 'movies_tv';
  } else if (
    taskName.includes('read') ||
    taskName.includes('book')
  ) {
    return 'books';
  } else if (
    taskName.includes('eat') ||
    taskName.includes('food')
  ) {
    return 'food';
  }
  // else {
  //   return categoryFinderApi(taskTitle, (result) => {
  //     console.log("result: ", result);

  //     return result;
  //   })
  // }
 };


const categoryFinderApi = function(taskTitle, callback) {
   request(`https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyAfocBMJa0FOqZWCAZWqOIjoF9BsU_BKyo&cx=c2c907cd368fa4916&q=${taskTitle}`, (err, response, body) => {
    const results = JSON.parse(body).items;
    // console.log(results);
    const data = [];
      for (const result of results) {
        data.push(result.snippet);
      }
    console.log(data);

    for (let element of data) {
      console.log(element);
      if (element.includes('vegetable')) {
        const output = 'product';
        return callback(output);
      }
    }
    callback(null);
  })
};

const addTask = function(title, category, priority) {

  if (category == 'uncategorized') {
    // console.log("category:", category);
    category = categoryFinder(title);
    // console.log("category:", category);
  };
  if (category == undefined) {
    return categoryFinderApi(title, (result) => {
      console.log("result: ", result);
      const taskValues = [
        `${title}`,
        `${result}`,
        `${priority}`,
      ];
       return db
        .query(`INSERT INTO tasks (title, category, priority)
      VALUES ($1, $2, $3) RETURNING *;`, taskValues)
        .then((result) => {
          return result.rows[0];
        })
        .catch((err) => {
          console.log('cannot add task', err);
        });
      return result;
    })
    console.log(category);
  }

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
  };
  res.json({ newTask });

  addTask(newTask.title, newTask.category, newTask.priority);

});

module.exports = router;
