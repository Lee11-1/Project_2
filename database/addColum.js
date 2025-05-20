const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE users
    ADD  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
  console.log(`✅ Đã add`);
  
  };

add()