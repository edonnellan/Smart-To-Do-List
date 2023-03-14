const express = require('express');
const router  = express.Router();
const taskQueries = require('../db/queries/tasks');


router.get('/', (req, res) => {
  taskQueries.getTasks()
    .then(tasks => {
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const item = req.body.input;
});

module.exports = router;
