require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
// const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString:   "postgresql://mydata_586h_user:7u4TIop2q1gBlWRS11F7fCo9slnlYmgy@dpg-d10sp7ali9vc7385jfhg-a.singapore-postgres.render.com/mydata_586h",
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });
// module.exports = pool;