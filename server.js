const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Coding101",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("it's working");
    start();
});



function start() {
inquirer.prompt(
    {
        type: "list",
        message: "What would you like to do?",
        name: "question",
        choices: ["View All Employees", "View All Employees by Department", 
        "View All Employees by Manager", "Add Employee", "Remove Employee", 
        "Update Employee Role", "Update Employee Manager", "Quit", new inquirer.Separator()]
    }
).then(function (answer) {
    switch (answer.question) {
        case "View All Employees":
            connection.query("SELECT * FROM employee_trackerDB.employees;", function(err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        break;
        case "View All Employees by Department":
            inquirer.prompt([
                {
                    type: "input",
                    message: "Department name?",
                    name: "department"
                }
                ]).then(function(response) {
                    let { department } = response;
                    connection.query(`SELECT * FROM employee_trackerDB.employees WHERE department = "${ department }";`, function(err, res){ 
                        if (err) throw err;
                        console.table(res);
                        start();
                    })
                });
        break;
        case "View All Employees by Manager":
            console.log("manager is working");
        break;
        case "Add Employee":
            inquirer.prompt([
            {
                type: "input",
                message: "New employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "and their last name?",
                name: "lastName"
            }
            ]).then(function(response) {
                let { firstName, lastName } = response;
                connection.query("INSERT INTO employees SET ?", {firstName, lastName}, function(err, res){ 
                    if (err) throw err;
                    console.log(res);
                })
            });
        break;
        case "Remove Employee":
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter employee's ID #:",
                    name: "id"
                }
                ]).then(function(response) {
                    let { id } = response;
                    connection.query(`DELETE FROM employees WHERE id = ${id}`, function(err, res){ 
                        if (err) throw err;
                        console.log("Employee deleted!")
                    })
                });
        break;
        case "Update Employee Role":
            console.log("employee role is working");
        break;
        case "Update Employee Manager":
            console.log("employee's manager is working");
        break;
        case "Quit":
            console.log("bye");
            connection.end();
        break;
    }
});
}