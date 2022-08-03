import mysql from 'mysql2';

import inquirer from "inquirer";

import cTable from "console.table";
import { ftruncateSync } from 'fs';
import { consumers } from 'stream';


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
            name: "newEmployeeFirstName",
            type:"input",
            message:"What is the new employee's first name?(Required Field)."
        },
        {
            name:"newEmployeeLastName", 
            type:"input",
            message:"What is the new employee's last name?(Required Field)."
        },
        {
            name: "newEmployeeDepartment",
            type: "list",
            message: "What department does the new employee work in?(Required Field).",
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        },
        {
            name: "newEmployeeSalary",
            type: "input",
            message: "What is the new employee's salary (Required Field)."
        },
        {
            name: "newEmployeeManager",
            type: "list",
            message: "Who is the new employee's manager?(Required Field).",
            choices: ['Robert Downey Jr.', 'Scarlett Johansson', 'Chris Evans', 'Mark Ruffalo']
        },
        {
            name:"newEmployeeRole",
            type:"list",
            message:"What is the new employee's role?(Required Field).",
            choices: ['Salesperson', 'Software Engineer', 'Lead Engineer', 'Account Manager', 'Accountant', 'Sales Team Lead', 'Legal Team Lead', 'Lawyer']
        }
    ])

    //Assigning employee manager's an ID.


    .then(function(answer) {

        let newEmpMgr = " ";

        let answerNEM = newEmployeeManager;

        if (answer.newEmployeeManager === "Robert Downey Jr.") {
            newEmpMgr = 5;
        }

        if (answerNEM === "Scarlett Johansson") {
            newEmpMgr = 3;
        }

        if (answerNEM === "Chris Evans") {
            newEmpMgr = 4;
        }

        if (answerNEM === "Mark Ruffalo") {
            newEmpMgr = 9;

        }


        let query = connection.query(
            "INSERT INTO employee SET ?",


            {
                first_name: answer.newEmployeeFirstName,
                last_name: answer.newEmployeeLastName,
                emp_dept: answer.newEmployeeDepartment,
                salary: answer.newEmployeeSalary,
                roles_id: newEmployeeRole,
                manager_id: newEmployeeManager
            },

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "employee added!\n");
                performSearch();
            }
        )
    });
}
