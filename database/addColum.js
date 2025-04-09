const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE tests
    ADD time_limit VARCHAR(50);
    `);
  console.log(`✅ Đã add`);
  
  };

add()