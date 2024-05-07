// Configuration of database connection
import "dotenv/config";

const config = {
  db: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    connectTimeout: 60000,
  },
  listPerPage: 10,
};

export default config;
