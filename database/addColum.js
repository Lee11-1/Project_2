const pool = require('./data');

const add = async () => {
  await pool.query(`
    ALTER TABLE questions_tests
    ADD answer_D TEXT NOT NULL;
    
    ALTER TABLE questions_exams
    ADD answer_D TEXT NOT NULL;
    `);
  console.log(`✅ Đã add`);
  
  };

add()