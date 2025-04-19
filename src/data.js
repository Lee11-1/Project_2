const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://hatrung123:UM0KaSGrK7KyBzVJSOWeaWQ27KTJFxrw@dpg-d0147m2dbo4c73drc850-a.singapore-postgres.render.com/hatrung123",
  ssl: {
    rejectUnauthorized: false,
  }
});
module.exports = pool;
