import mysql from 'mysql2';

import inquirer from "inquirer";

import cTable from "console.table";


//VARIABLES -- 

var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    
    password:"",
    database:"employees_db",

});


connection.connect(function(err) {
    if (err) throw err;
    console.log ("you are connected as id:" + connection.threadId + "\n");

    performSearch();
});

function performSearch() {

    inquirer
    .prompt({

        name: "doWhat",
        type: "list",
        message: "What action would you like to perform?",
        choices: ["View all departments.", "View all employees.", "View all employees by department.", "View all employees by manager.", "Add employee.", "Remove employee.", "Update employee role.", "Update employee manager.", "End session."]
    })

    .then (function(answers) {

        switch (answers.doWhat) {
            case "View all departments":
                viewAllDepartments();
                break;

            case "View all employees":
                viewAllEmployees();
                break;

            case "View all employees by department":
                viewAllEmployeesDepartment();
                break

            case "View all employees by manager":
                viewAllEmployeesManager();
                break

            case "Add employees":
                addEmployees();
                break

            case "Remove employees":
                removeEmployees();
                break

            case "Update employee role":
                updateEmployeeRole();
                break

            case "Update employee manager":
                updateEmployeeManager();
                break

            case "End Session":
                endSession();
                break
        }
    });
};

function viewAllDepartments() {
    connection.query("SELECT id, dept_name, salary FROM department", function (err, res){
        if (err) throw err;
        console.table('Departments', res);
        performSearch();
    });
};




