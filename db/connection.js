import mysql from 'mysql2';

import inquirer from "inquirer";

import cTable from "console.table";
import { ftruncateSync } from 'fs';


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


function viewAllEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.salary, department.dept_name, roles.title, mgr_name";
    query += "FROM employee";
    query += "INNER JOIN department ON employee.emp_dept";
    query += "INNER JOIN roles ON department.id = roles.department_id";
    query += "INNER JOIN manager ON employee.manager_id = manager.id";


    connection.query(query, function(err, res){
        console.table('ALL EMPLOYEES', res);
        performSearch();
    })
};

function viewEmpByManager() {
    console.log("VIEWING EMPLOYEES BY MANAGER");

    var query = "SELECT manager.id, manager.mgr_name, employee.first_name, employee.last_name";

    query += "FROM manager";
    query += "INNER JOIN employee ON manager.id = employee.manager_id";
    query += "ORDER BY manager.mgr_name";
    

    connection.query(query, function(err,res){
        console.table('EMPLOYEES GROUPED BY MANAGER', res);
        performSearch();
    })
};

function addEmployees() {
    inquirer
    .prompt([
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
        {
            name:
            type:
            message:
        }
    ])
}


