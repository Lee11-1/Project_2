const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://mydata_stoj_user:pfAAWHH5PRqG0dBdeeTsqOlqdSwULAZu@dpg-d0lej30gjchc73f0t5og-a.singapore-postgres.render.com/mydata_stoj",
  ssl: {
    rejectUnauthorized: false,
  }
});
module.exports = pool;
