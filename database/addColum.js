const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE questions
    ADD task VARCHAR(500);
    `);
  console.log(`✅ Đã add`);
  
  };

add()