const pool = require('./data');

/*drop table

await pool.query("DROP TABLE users");
console.log("✅ Đã xóa bảng 'users' thành công!");

*/
/* delete where

await pool.query("DELETE FROM users WHERE id = $1", [5]);
console.log("✅ Đã xóa user có ID = 5");

  await pool.query(`DROP TABLE ${tableName}`);
  console.log("✅ Đã xóa bảng 'users' thành công!");
  console.log(`✅ Đã xóa toàn bộ dữ liệu trong bảng ${tableName}`);
*/

const deleTable = async () => {

  await pool.query("DELETE FROM exam_attempts WHERE user_id = $1 OR user_id = $2", [3,4]);
console.log("✅ Đã xóa");
  
  };
  deleTable();
  
  