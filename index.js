//require all the modules we are going to use.
require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { updateEmployeesRoles } = require("./db/query.js");
const db = require("./db/query.js");

const questions = [
  {
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
  addDepartments()
  break;

      default:
          process.exit();
    }
  });
}

function viewAllEmployees() {
  db.findAllEmployees().then(([data]) => {
    console.table(data);
  }).then(()=>{
      start();
  });
}
function viewAllDepartments() {
    db.findAllDepartments().then(([data]) => {
      console.table(data);
    }).then(()=>{
        start();
    });
  }
  function viewAllRoles() {
    db.findAllRoles().then(([data]) => {
      console.table(data);
    }).then(()=>{
        start();
    });
  }

  function updateEmployeeRole(){
    db.findAllEmployees().then(([data])=>{
      let empChoices = data.map(({id, first_name, last_name})=>({
        name:`${first_name} ${last_name}`,
        value: id
      }))

      inquirer.prompt([{
        type: 'list',
        name: 'employeeId', 
        message:'which employee are you updating?',
        choices: empChoices
      }]).then((res)=>{
        let employeId = res.employeId

        db.findAllRoles().then(([rows])=>{
        let roleChoices = rows.map(({id, title})=>({
          name: title,
          value: id
        }))

        inquirer.prompt([{
          type: 'list',
          name: 'roleId',
          message:'Which role do you want to give to the Employee?',
          choices: roleChoices
        }]).then((res)=>{
          db.updateEmployeesRoles(employeId, res.roleId)
        }).then(()=> start())

        })

      })
    })

  }
function addDepartments() {
  inquirer.prompt([{
    type: 'list',
    name: 'addDepartment',
    message:'What department would you like to add',
    choices: roleChoices
  }]).then((res)=>{
    db.addDepartments(department)
  }).then(()=> start())
  
}

   


start();
