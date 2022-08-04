


import mysql from 'mysql2';
import inquirer from "inquirer";
import { createConnection } from 'net';
import {printTable} from "console-table-printer";


// VARIABLES -- 

// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 8080,
//     user: "root",
    
//     password:"",
//     database:"employees_db",

// });


// connection.connect(function(err) {
//     if (err) throw err;
//     console.log ("you are connected as id:" + connection.threadId + "\n");

//     performSearch();
// });

performSearch();


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
                viewEmployeesByManager();
                break

            case "Add employees":
                addEmployees();
                break

            case "Remove employees":
                removeEmployee();
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
        printTable('Departments', res);
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
        printTable('ALL EMPLOYEES', res);
        performSearch();
    })
};

function viewEmployeesByManager() {
    console.log("VIEWING EMPLOYEES BY MANAGER");

    var query = "SELECT manager.id, manager.mgr_name, employee.first_name, employee.last_name";

    query += "FROM manager";
    query += "INNER JOIN employee ON manager.id = employee.manager_id";
    query += "ORDER BY manager.mgr_name";
    

    connection.query(query, function(err,res){
        printTable('EMPLOYEES GROUPED BY MANAGER', res);
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


        var query = connection.query(
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
    })
}

function updateEmployeeRole() {

    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, employee_roles_id, roles.title ";
    query += "FROM employee";
    query += "INNER JOIN department ON employee.emp_dept = department.dept_name";
    query += "INNER JOIN roles ON department.id = roles.department_id";

    connection.query(query, function(err,results) {
        if (err) throw err;

        inquirer
        .prompt ([
            {
                name: "choice",
                type:"rawlist",
                message:"Who's role would you like to update",
                choices: function() {


                    let choiceArray = [];
                    for (let i = 1; i < results.length; i++) {
                        let emp = "";
                        employee = `${results[i].id} ${results[i].first_name} ${results[i].last_name} ${results[i].dept_name} ${results[i].roles_id} ${results[i].title}`
                        choiceArray.push(employee)
                    }

                    return choiceArray;
                }
            },

            {
                name: "updateRole",
                type:"list",
                message: "What update would you like to apply to this role?",
                choices: ['Salesperson', 'Software Engineer', 'Lead Engineer', 'Account Manager', 'Accountant', 'Sales Team Lead', 'Legal Team Lead', 'Lawyer']
            }
        ])

        .then(function(answer) {
            updateChosenRole(answer);
            return answer;
        })
    })
}



function updateChosenRole(answer) {
    
    newManager = "";
    newDepartment = "";
    newRoleID = "";

    var answerUR = answer.updateRole;

    if (answerUR === 'Salesperson') {

        newManager = "5";
        newDepartment = "Sales";
        newRoleID = "2";
    }

    if (answerUR === 'Software Engineer') {

        newManager = "4";
        newDepartment = "Engineering";
        newRoleID = "3";
    }

    if (answerUR === 'Lead Engineer') {

        newManager = "4";
        newDepartment = "Engineering";
        newRoleID = "4";
    }
    if (answerUR === 'Account Manager') {

        newManager = "5";
        newDepartment = "Sales";
        newRoleID = "5";
    }
    if (answerUR === 'Accountant') {

        newManager = "9";
        newDepartment = "Finance";
        newRoleID = "6";
    }
    if (answerUR === 'Sales Team Lead') {

        newManager = "5";
        newDepartment = "Sales";
        newRoleID = "7";
    }
    if (answerUR === 'Legal Team Lead') {

        newManager = "3";
        newDepartment = "Law";
        newRoleID = "8";
    }
    if (answerUR === 'Lawyer') {

        newManager = "3";
        newDepartment = "Law";
        newRoleID = "9";
    }
let choiceStr = answer.choice.split(" ")
console.log(answer);
console.log (choiceStr[0]);


connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
        {
            roles_id: newRoleID,
            emp_dept: newDepartment,
            manager_id: newManager,
        },
        {

        id: parseInt(choiceStr[0])

        }
    ],

    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + "you have UPDATED the Employee's Role successfully");

        performSearch();
    }
  )
}


function removeEmployee() {

    let query = "SELECT employee.id, employee.first_name, employee.last_name";
    query += "FROM employee";
    connection.query(query, function(err, results) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "choice",
                type:"rawlist",
                message: "Which employee do you want to delete?",
                choices: function() {
                    let choiceArray = [];
                    for(let i = 1; i < results.length; i++) {
                        let emp = " ";
                        emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name}`
                        choiceArray.push(emp);
                    }

                    return choiceArray;
                }
            }
        ])

        .then(function(answer) {
            deleteRemovedEmployee(answer);
            return answer;
        })
    })
}

function deleteRemovedEmployee(answer) {
    let choiceStr = answer.choice.split(" ");
    connection.query (
        "DELETE FROM employee WHERE?",
        [
            {
                id: parseInt(choiceStr[0])
            }
        ],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "You have successfully deleted the EMPLOYEE from the database");
            performSearch();
        }
    )
}


function updateEmployeeManager() {

    let query = "SELECT employee.id, employee.first_name, employee.last_name";
    query += "FROM employee";
    

    connection.query (query, function(err, results) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                message: "Which manager would you like to update?",
                choices: function() {
                    let choiceArray = [];
                    for (let i = 1; i < results.length; i++) {
                        let emp = " ";
                        emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name}`
                        choiceArray.push(emp)
                    }

                    return choiceArray;

                }
            },
            {
                name: "managerUpdate",
                type: "list",
                message: "Assign a manager to this employee",
                choice: ["Robert Downey Jr.', 'Scarlett Johansson', 'Chris Evans', 'Mark Ruffalo"]
            }
        ])

        .then (function(answer) {
            updateNewEmployeeManager(answer);
            return answer;
        })

    })
}

function updateNewEmployeeManager(answer) {

    let updateNewManager = "";

    let answerMU = answer.managerUpdate;

    if (answerMU === 'Robert Downey Jr.') {
        updateNewManager = 5;
    };

    if (answerMU === 'Scarlett Johannson') {
        updateNewManager = 3;
    }

    if (answerMU === 'Chris Evans') {
        updateNewManager = 4;
    }

    if (answerMU === 'Mark Ruffalo') {
        updateNewManager = 9;
    }

    let choiceStr = answer.choice.split(" ");

    connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
            {
                manager_id: newManager
            },
            {
                id: parseInt(choiceStr[0])
            }
        ],

        function(err,res) {
            if(err) throw error;
            console.log(res.affectedRows + "You have succesfully UPDATED the Employee's manager");
            performSearch();
        }
    )
}

function endSession() {
    console.log("SESSION ENDED");
    connection.end();
};


