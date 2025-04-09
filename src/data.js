const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://quizdata_user:Y51ogpQKDF4AdMvrrDsIBkyvZd1jGACk@dpg-cvi1lkqn91rc73ak0teg-a.singapore-postgres.render.com/quizdata",
  ssl: {
    rejectUnauthorized: false,
  }
});
module.exports = pool;
