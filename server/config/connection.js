const Sequelize = require("sequelize");

module.exports = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'pg_db',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false
    }
  });
  