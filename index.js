//require all the modules we are going to use.
require("console.table");
const inquirer = require("inquirer");
const db = require("./db/query.js");

//created variable
const questions = [
  {
    //what is the the type, name, and message.  Choose your choices
    type: "list",
    name: "title",
    message: "What you like to do?",
    choices: [
      "View All Employees",
      "Add Employees",
      "Update Employee Role",
      "Add Role",
      "View All Departments",
      "View All Roles",
      "Add Departments",
      "Quit",
    ],
  },
];

function start() {
  inquirer.prompt(questions).then((data) => {
    console.log(data);
    switch (data.title) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Departments":
        viewAllDepartments();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;

      case "Add Departments":
        addDepartments();
        break;
      case "Add Employees":
        addEmployees();
        break;
      default:
        process.exit();
    }
  });
}
// create function  call what you are wanting from the database.
function viewAllEmployees() {
  db.findAllEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      start();
    });
}
function viewAllDepartments() {
  db.findAllDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      start();
    });
}
function viewAllRoles() {
  db.findAllRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      start();
    });
}

function updateEmployeeRole() {
  //run the find all employees functions from the bck end
  db.findAllEmployees().then(([data]) => {
    let empChoices = data.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "which employee are you updating?",
          choices: empChoices,
        },
      ])
      .then((res) => {
        console.log(res);
        let employeId = res.employeId;

        db.findAllRoles().then(([rows]) => {
          let roleChoices = rows.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message: "Which role do you want to give to the Employee?",
                choices: roleChoices,
              },
            ])
            .then((res) => {
              console.log(res);
              db.updateEmployeesRoles(employeId, res.roleId);
            })
            .then(() => start());
        });
      });
  });
}
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add",
      },
    ])
    .then((res) => {
      db.addDepartment(res);
    })
    .then(() => start());
}

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employees first name",
      },

      {
        type: "input",
        name: "last_name",
        message: "What is the employees last name",
      },

    ])
    .then((res) => {
      //create two variables for the first name and last name from the res
      var first_name = res.first_name;
      var last_name =res.last_name;

      //this is a map of all the available roles
      db.findAllRoles().then(([rows]) => {
        let roleChoices = rows.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        //create another prompt that lists the roles available
        inquirer
        .prompt([
          {
            type: "list",
            name: "roles",
            message: "What is the employee's role?",
            choices: roleChoices
          },
          //then pass that data to antoher .then that lists the employees avaialble
        ]).then((res)=>{

          var roleId = res.roles;

          //create a map of all the employees
          db.findAllEmployees().then(([data]) => {
            let empChoices = data.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));

            
            //then create another prompt that asks the user who the employess mananger is
            inquirer
            .prompt([
              {
                type: "list",
                name: "roles_manager",
                message: "Who is your mananger?",
                choices: empChoices,
              },
            ])

            //then pass that data down to another .then()
            .then((data) => {
              //capture the users choice
              var managerId = data.roles_manager

              //then create an object that hold the manager id, the role id, the first name, the last name.

              var employee ={
                manager_id: managerId,
                role_id: roleId, 
                first_name: first_name,
                last_name: last_name
              }

              //pass that object to the addEmployye function that is in the query.js
              db.addEmployee(employee);

            }) 
            //then make sure that the start function is called again
         

         .then(()=>
         start())

         
          
        })


      });
    });
})

}


start();
