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
//   connectionString:   "postgresql://mydata_8aka_user:gvRspR9a4IbGjovKeJS9fAlCLzc5SMnm@dpg-d0vt8o2li9vc73d81qpg-a.singapore-postgres.render.com/mydata_8aka",
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });
// module.exports = pool;