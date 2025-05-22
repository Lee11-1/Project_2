const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://mydata_stoj_user:pfAAWHH5PRqG0dBdeeTsqOlqdSwULAZu@dpg-d0lej30gjchc73f0t5og-a.singapore-postgres.render.com/mydata_stoj",
  //connectionString: "postgresql://mydata_tdab_user:jEoOh3pVXDrFVxdQNLYWBB4kLn6jtEwL@dpg-d0m8bgqdbo4c73cjpvqg-a.singapore-postgres.render.com/mydata_tdab" ,
  ssl: {
    rejectUnauthorized: false,
  }
});
module.exports = pool;
