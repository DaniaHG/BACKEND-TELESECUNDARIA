const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"hdvqmk9nv0zhsrrb",
    password:"uci8xj0fr0txztw6",
    database:"dte0g8247tlcbkvs",
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('En linea...');
    }
  });

  module.exports = mysqlConnection;