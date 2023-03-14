const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
// const request = require("request");

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
  } else {
    return 'uncategorized';
  }
 };

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
  } else {
    return 'uncategorized';
  }
 };


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
  } else {
    categoryFinderApi(taskTitle);
  }
 };

 const categoryFinderApi = function(taskTitle) {
  console.log("api call");
  request(`https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyAfocBMJa0FOqZWCAZWqOIjoF9BsU_BKyo&cx=c2c907cd368fa4916&q=${taskTitle}`, (err, response, body) => {
    const results = JSON.parse(body).items;
    console.log(results);
  })
 };

const addTask = function(title, category, priority) {

  if (category == 'uncategorized') {
    category = categoryFinder(title)
  };

  if (category === 'uncategorized') {
    category = categoryFinder(title);
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
  }
  res.json({ newTask });

addTask(newTask.title, newTask.category, newTask.priority);

});

module.exports = router;
