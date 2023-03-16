const db = require('../connection');

const getTasks = () => {
  return db.query('SELECT * FROM tasks ORDER BY date DESC, is_important DESC;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks };
