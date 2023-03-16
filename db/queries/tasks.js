const db = require('../connection');

const getTasks = () => {
  return db.query('SELECT * FROM tasks ORDER BY is_important DESC, date DESC;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks };
