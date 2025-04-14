const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE classes
    ADD type VARCHAR(50);
    `);
  console.log(`✅ Đã add`);
  
  };

add()