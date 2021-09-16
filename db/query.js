// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '13130000',
      database: 'employeetracker_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
  
  connection.connect(function(err){
      if (err) throw err
  })

  class DB {
      constructor(connection){
          this.connection = connection
      }

      //findAllEmployee() function goes here. We need it to run a query with a select statement.
    //   SELECT role.id, role.salary, CONCAT(employee.first_name, " ", employee.last_name) AS Employee Name FROM role LEFT JOIN employee ON role.id = employee.role_id;
      
  }

  module.exports = new DB(connection);