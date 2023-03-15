const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const request = require("request");
const axios = require("axios");
const { response } = require('express');


const categoryFinder = function(taskTitle) {
  const taskName = taskTitle.toLowerCase();
  if (taskName.includes('buy' || 'groceries' || 'amazon' || 'order' || 'purchase')
  ) {
    return 'products';
  } else if (
    taskName.includes('watch' || 'stream' || 'movie' || 'film' || 'TV')
  ) {
    return 'movies_tv';
  } else if (
    taskName.includes('read' || 'book')
  ) {
    return 'books';
  } else if (
    taskName.includes('eat' || 'food')
  ) {
    return 'food';
  } else {
    return 'uncategorized';
  }
};


const categoryFinderApi = function(taskTitle, callback) {
  request(`https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyAfocBMJa0FOqZWCAZWqOIjoF9BsU_BKyo&cx=c2c907cd368fa4916&q=${taskTitle}`, (err, response, body) => {
    const results = JSON.parse(body).items;
    const data = [];
    for (const result of results) {
      data.push(result.snippet);
    }
    console.log(data);

    for (let element of data) {
      let output = '';
      console.log(element);
      if (element.includes('vegetable') || element.includes('electronics') || element.includes('fruit') || element.includes('appliance') || element.includes('product')) {
        output = 'product';
        return callback(output);
      } else if (element.includes('stream') || element.includes('movie') || element.includes('television') || element.includes('sitcom') || element.includes('film') || element.includes('watch')) {
        output = 'movies_tv';
        return callback(output);
      } else if (element.includes('read') || element.includes('book') || element.includes('novel') || element.includes('author')) {
        output = 'books';
        return callback(output);
      } else if (element.includes('eat') || element.includes('restaurant') || element.includes('fast food')) {
        output = 'food';
        return callback(output);
      }
    }
    callback('uncategorized');
  });
};

const dbQuery = function(arr) {
  return db
    .query(`INSERT INTO tasks (title, category, priority)
VALUES ($1, $2, $3) RETURNING *;`, arr)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log('cannot add task', err);
    });
};

const addTask = function(res, title, category, priority) {

  // if (category === "uncategorized") {
  //   category = categoryFinder(title);
  // }

  if (category == "uncategorized") {
    return categoryFinderApi(title, (result) => {
      console.log("result: ", result);
      const taskValues = [
        `${title}`,
        `${result}`,
        `${priority}`,
      ];
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
  const output = dbQuery(values);
  console.log("addtask output:", output);
  return output;
};

router.post('/', (req, res) => {
  const newTask = {
    title: req.body.task_name,
    category: req.body.task_category,
    priority: req.body.task_priority
  };

  const taskRes = addTask(res, newTask.title, newTask.category, newTask.priority);
});

module.exports = router;
