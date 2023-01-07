const pool = require("../../config/database");
const oracledb = require("oracledb");
module.exports = {
  create: (abc,data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number) 
                values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  // getUsers
  getUsers: async (callBack) => {
    let con = null;
    pool
      .then(function (p) {
        return p.getConnection();
      })
      .then(function (connection) {
        con = connection;
        const sql = "SELECT*from publishers order by id desc";
        con.execute(
          sql,

          // { oracledb.autoCommit: true, outFormat: oracledb.OBJECT, maxRows: 1000 },
          function (err, result) {
            // Something went wrong - handle the data and release the connection
            if (err) {
              console.log("ERROR: Unable to execute the SQL: ", err);
              //releaseConnection(connection);
              return callBack(err);
            }

            // Return the result to the request initiator
            // console.log("INFO: Result from Database: ", result)
            console.log(result);
            con.release();
            //  con.close();
            return callBack(null, result.rows);
          }
        );
      });
  },
  // update user
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
