const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE exams
    ADD Ended TIMESTAMP;
    `);
  console.log(`✅ Đã add`);
  
  };

add()