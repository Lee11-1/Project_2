const pool = require('./data');
const bcrypt = require("bcryptjs");

const insertClass = async (class_id, user_id) => {
    try {
      const query = `
        INSERT INTO re_member (class_id, user_id)
        VALUES ($1, $2)
        RETURNING *;
      `;
  
      const values = [class_id, user_id];
  
      const { rows } = await pool.query(query, values);
      console.log("✅ Lớp học đã được thêm:", rows[0]);
    } catch (err) {
      console.error("❌ Lỗi khi chèn lớp học:", err);
    }
  };
  

  const insertAdmin = async (fullname, username, password, profession, email ) => {
    
    try {
      const query = `
        INSERT INTO users (fullname, username, password, profession, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const values = [fullname, username, hashedPassword, profession, email];

      const { rows } = await pool.query(query, values);
      console.log("✅ users đã được thêm:", rows[0]);
    } catch (err) {
      console.error("❌ Lỗi khi chèn users:", err);
    }
  };
  const insertUser = async (username, email, password, name, role ) => {
    
    try {
      const query = `
        INSERT INTO users (username, email, password, name, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const values = [username, email, hashedPassword, name, role];

      const { rows } = await pool.query(query, values);
      console.log("✅ users đã được thêm:", rows[0]);
    } catch (err) {
      console.error("❌ Lỗi khi chèn users:", err);
    }
  };
  insertUser("trung123", "trung@gmail.com", "trung123", "trung", "author");