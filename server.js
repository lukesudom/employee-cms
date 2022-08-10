//===IMPORTS===//
import db from "./db/connection.js";
import mySQL from "mysql2";
import cTable from "console.table";
import inquirer from "inquirer";
import { start } from "repl";

//===EASE OF USE VARIABLES===//

var cTab = console.table;

//===START OF PROMPTS===//

performSearch();
function performSearch() {
    return inquirer.prompt([
    {
        type: "list",
        name: "choices",
        message: "Please use the arrow keys to select an action",
        choices: ["View all departments.", "View all available roles.", "View all current employees.", "Add a department.", "Add a role.", "Add an employee.", "Update an employees role.", "END SESSION"]
    }]).then ((answers) => {

    
    console.log(answers.choices);
    switch (answers.choices) {
        case 'View all departments.':
            allDepartments();
            break;
        case 'View all available roles.':
            allRoles();
            break;
        case 'View all current employees.':
            allEmployees();
            break;
        case 'Add a department.':
            addDept();
            break;
        case 'Add a role.':
            addRole();
            break;
        case 'Add an employee.':
            addEmp();
            break;
        case 'Update an employees role.':
            updateEmpRole();
            break;

        case 'End user session.':
            endSession();
            break;
    }
});

};

//===PROMPT FUNCTIONS===//
const allRoles = function() {
    db.query('SELECT * FROM roles JOIN departments on departments.id = roles.department_id', function (err,results) {
        const roles = results.map(results => {
            return {
                id: results.id,
                title: results.title,
                salary: results.salary,
                department: results.name
            }
        })
        cTab(roles);
        performSearch();
    });
};

const allDepartments = function () {
    db.query('SELECT * FROM departments', function(err,result) {
        cTab(result);
        performSearch();
    });
};

const allEmployees = function() {
    db.query('SELECT * FROM employees JOIN roles on roles.id = employees.role_id', function(err, results) {
        const employees = results.map(result => {
            return {
                id: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                role: result.title,
                departments: result.department_id,
                salary: result.salary,
                manager: result.manager
            }
        })
        cTab(employees);
        performSearch();
    })
};

//===ADD FUNCTIONS===//

const addDept = function() {
    inquirer.prompt({
        name: 'name',
        type:'input',
        message:'What is the new Departments name?'
    }).then((result) => {
        cTab(result)
        db.query('INSERT INTO departments (name) VALUES (?)', [result.name], function(err,results) {
            performSearch();
        })
    })
}




const addRole =  function() {
    db.query('SELECT * FROM departments', function (err, results) {
        const role = results.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        cTab(role)

        inquirer.prompt([
            {
                name: 'name',
                type:'input',
                message:'Please enter the new role (required field).'
            },
            {
                name:'salary',
                type:'input',
                message:'Plese enter the new roles salary (required field).'

            },
            {
                name:'department_id',
                type:'list',
                message:'Select the new roles department',
                choices: role
            }
    ]).then (results => {
        cTab(results)
        db.query('INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)', [results.name, results.salary, results.department_id], function(err, results) {
            performSearch();
        });
    })
    })
}

const addEmp = function() {
    db.query('SELECT * FROM roles', function (err, results) {
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'Please enter the employees first name. (required field)'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the employees last name. (required field)'

        },      
        {
            type: 'input',
            name: 'manager',
            message: 'Please enter the employees managers name. (required field)',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Please select the employees role. (required)',
            choices: roles

        },

        ]).then(result => {
            cTab(result)
            db.query('INSERT INTO employees (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)', [result.first_name, result.last_name, result.role_id, result.manager], function (error, results) {
                console.log(error)
                performSearch();
            })
        })
    });
};


const updateEmpRole = function() {

    db.query('SELECT * FROM employees', function(err,results) {
        const employees = results.map(({ id, first_name, last_name }) => ({

            name: first_name + ' ' + last_name,
            value: id
        }))
        inquirer.prompt([
            {
                type:'list',
                name:'employee_id',
                message:'Please select the employee you with to update',
                choices:employees

            }
        ])
        .then (employee => {
            db.query('SELECT * FROM roles', function(err, results) {
                const roles = results.map(({ id, title }) => (
                    {
                        name: title,
                        value: id,
                    }))
        inquirer.prompt([
        {
            type:'list',
            name:'role_id',
            message:'Please enter the employees new role',
            choices: roles

        }
    ])
    .then (result => {
        cTab(result)
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [result.role_id, employees.employee_id], function(err, results) {
            console.log(err);
            performSearch();
        })
    })
    });
})
});
};


//===END USER SESSION ===//
const endSession = function() {
    console.log('Thanks for using the employee CMS your session has now ended.');
};