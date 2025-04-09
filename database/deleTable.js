const pool = require('./data');

/*drop table

await pool.query("DROP TABLE users");
console.log("✅ Đã xóa bảng 'users' thành công!");

*/
/* delete where

await pool.query("DELETE FROM users WHERE id = $1", [5]);
console.log("✅ Đã xóa user có ID = 5");

*/

const deleTable = async (tableName) => {
  await pool.query(`
    DELETE FROM ${tableName};
    
    `);
  console.log(`✅ Đã xóa toàn bộ dữ liệu trong bảng ${tableName}`);
  
  };
  
  // Gọi hàm để xóa dữ liệu từ bảng 'users'
  deleTable("classes");
  