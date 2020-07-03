const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "malamaal",
      password: "Qwerty@321",
    },
    type: "default",
  },
  server: "malamaal.database.windows.net",
  options: {
    database: "Flaskquake",
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
    useColumnNames: true,
    multipleStatements: true,
  },
};


const connection = new Connection(config);

connection.on("connect", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connedted to DB");
  }
});

module.exports = connection;
