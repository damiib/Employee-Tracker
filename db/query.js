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

      findAllEmployees(){
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
      }

      findAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department;")
      }
    //   SELECT role.id, role.salary, CONCAT(employee.first_name, " ", employee.last_name) AS employeename FROM employee LEFT JOIN role ON role.id = employee.role_id;

    //(select *) = all the columns and the data associated with them.
    //(FROM 'tableName') = the table where the data originates from.
      

    //create a function called findAllRoles. this select statement needs to brings in the columns role id, role title, the department name, and the role salary. you need to Left Join the department table. Test in mysql CLI.
    findAllRoles(){
      return this.connection.promise().query("SELECT role.id,role.title,department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;") 
    }
    
  }

  module.exports = new DB(connection);