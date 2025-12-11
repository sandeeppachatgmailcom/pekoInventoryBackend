const mysql = require('mysql2');

const MySqlDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '[1Dr007]',
  database: 'warehouse_db'
}).promise();

MySqlDb.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = MySqlDb

