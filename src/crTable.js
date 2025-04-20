const pool = require('./data');

const createTable = async () => {
  try {
    const checkTable = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'exams_mem'
      )
    `);

    if (checkTable.rows[0].exists) {
      console.log("⚠️ Bảng  đã tồn tại. Không cần tạo lại.");
      return;
    }

    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        profession VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS classes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        owner_id INT REFERENCES users(id) ON DELETE CASCADE,
        subject VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS class_members (
        id SERIAL PRIMARY KEY,
        class_id INT REFERENCES classes(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS questionSets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        owner_id INT REFERENCES users(id) ON DELETE CASCADE,
        class_id INT REFERENCES classes(id) ON DELETE CASCADE
      );

       CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        task VARCHAR(500) NOT NULL,
        question_text TEXT NOT NULL,
        id_Set INT REFERENCES questionSets(id) ON DELETE CASCADE,
        answer_A TEXT NOT NULL,
        answer_B TEXT NOT NULL,
        answer_C TEXT NOT NULL,
        answer_correct TEXT NOT NULL CHECK (answer_correct IN ('A', 'B', 'C'))
      );

     
      CREATE TABLE IF NOT EXISTS tests (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        timelimit INT NOT NULL,
        numberQuestion INT NOT NULL,
        created_by INT REFERENCES users(id) ON DELETE CASCADE,
        class_id INT REFERENCES classes(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS questions_tests (
        id SERIAL PRIMARY KEY,
        test_id INT REFERENCES tests(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        answer_A TEXT NOT NULL,
        answer_B TEXT NOT NULL,
        answer_C TEXT NOT NULL,
        answer_correct TEXT NOT NULL CHECK (answer_correct IN ('A', 'B', 'C'))
      );

      CREATE TABLE IF NOT EXISTS test_attempts (
        id SERIAL PRIMARY KEY,
        test_id INT REFERENCES tests(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        score FLOAT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS re_member (
        id SERIAL PRIMARY KEY,
        class_id INT REFERENCES classes(id) on DELETE CASCADE,
        user_id INT REFERENCES users(id) on DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS exams(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) on DELETE CASCADE,
        timelimit INT NOT NULL,
        Ended TIMESTAMP Not NULL,
        numberQuestion INT NOT NULL,
        title VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

      CREATE TABLE IF NOT EXISTS exam_attempts (
        id SERIAL PRIMARY KEY,
        exam_id INT REFERENCES exams(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        score FLOAT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

       CREATE TABLE IF NOT EXISTS questions_exams (
        id SERIAL PRIMARY KEY,
        exam_id INT REFERENCES exams(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        answer_A TEXT NOT NULL,
        answer_B TEXT NOT NULL,
        answer_C TEXT NOT NULL,
        answer_correct TEXT NOT NULL CHECK (answer_correct IN ('A', 'B', 'C'))
      );
`;

const query1 = ` CREATE TABLE IF NOT EXISTS exams_mem(
                    id SERIAL PRIMARY KEY,
                    exam_id INT REFERENCES exams(id) ON DELETE CASCADE,
                    user_id INT REFERENCES users(id) ON DELETE CASCADE )` ;
     

    await pool.query(query1);
    console.log("✅ Tạo bảng thành công!");
  } catch (err) {
    console.error("❌ Lỗi tạo bảng:", err);
  } finally {
    pool.end(); // Đóng kết nối
  }
};

// Gọi hàm để tạo bảng
createTable();
