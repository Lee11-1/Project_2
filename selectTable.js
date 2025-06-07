const pool = require('./data');


const selectTable = async (tableName) => {
    try {
      // Kiểm tra xem tên bảng có hợp lệ không
      if (!tableName) {
        throw new Error("❌ Tên bảng không hợp lệ!");
      }
  
      // Tránh SQL Injection bằng cách sử dụng placeholder ($1)
    const selectUsersQuery = `SELECT * FROM ${tableName}`;
    const { rows } = await pool.query(selectUsersQuery);
  
    console.log(`Data from '${tableName}'`);
    console.table(rows);
    } catch (err) {
      console.error("❌ Lỗi khi tim dữ liệu:", err);
    }
  };
  
  
  selectTable("users");
  // selectTable("books");
  // selectTable("book_requests");
  // selectTable("user_books")
  // selectTable("classes");
  // selectTable("class_members");
//  selectTable("folders");
//  selectTable("files");
//   selectTable("tests");
//   selectTable("questions");
//   selectTable("quiz_attempts");
  // selectTable("re_member");
  // selectTable("test_attempts");


