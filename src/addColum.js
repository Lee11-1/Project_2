const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE questions
    ADD answer_D TEXT NOT NULL;
    `);
  console.log(`✅ Đã add`);
  
  };

add()