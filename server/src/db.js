const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'growthplusfarm_credential',
  password: '080860',
  database: 'growthplusfarm',
});

module.exports = pool;