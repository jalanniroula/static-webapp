const { Connection, Request } = require("tedious");
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "viceapp_admin", // update me
      password: "W80f3KKD7y8A" // update me
    },
    type: "default"
  },
  server: "viceapp.database.windows.net", // update me
  options: {
    database: "db_ViceApplication", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM tbl_countries `,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}
