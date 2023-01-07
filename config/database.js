const { createPool } = require("mysql");
const oracledb = require("oracledb");
// const pool = createPool({
//   host: process.env.MYSQL_HOST,

//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   connectionLimit: 10,
//   connectTimeout: 60 * 60 * 1000,
//   acquireTimeout: 60 * 60 * 1000,
//   timeout: 60 * 60 * 1000,
// });
const pool = oracledb.createPool({
  user: "system",
  password: "system123",
  connectString: "localhost/orcl",
  poolMin: 1,
  poolMax: 10,
  poolTimeout: 300,
});
// ,
//   (error, pool) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log("Connection Pool DB1 success", pool);
//   }
module.exports = pool;
