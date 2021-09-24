//require all the modules we are going to use.
require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
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


start();
