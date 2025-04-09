const pool = require('./data');
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
  
  // Gọi hàm để chèn dữ liệu
  insertClass(17, 6);
  insertClass(17, 7);
  insertClass(17, 8);
