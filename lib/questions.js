const db = require('../db/connection');
const inquirer = require('inquirer');
const startApp = require('../index');


function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.table(rows);
        }
    });
}

function viewAllRoles() {
    db.promise()
        .query('SELECT * FROM role')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(err => {
            console.error(err);
        });
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.table(rows);
        }
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:'
        })
        .then(answer => {
            db.query('INSERT INTO department SET ?', { name: answer.name }, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Department ${answer.name} added successfully!`);
                }
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for the role:'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter the department ID for the role:'
            }
        ])
        .then(answer => {
            const role = {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            };
            db.query('INSERT INTO role SET ?', role, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Role ${role.title} added successfully!`);
                }
            });
        });
}

function addEmployee() {
    // Prompt user to enter role details
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: "Enter the title of the new role:"
            },
            {
                name: 'salary',
                type: 'input',
                message: "Enter the salary of the new role:"
            },
            {
                name: 'department_id',
                type: 'input',
                message: "Enter the department ID for the new role:"
            }
        ])
        .then(roleAnswer => {
            // Create new role
            const role = {
                title: roleAnswer.title,
                salary: roleAnswer.salary,
                department_id: roleAnswer.department_id
            };

            db.query('INSERT INTO role SET ?', role, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Role '${role.title}' added successfully!`);

                // Prompt user to enter employee details
                inquirer
                    .prompt([
                        {
                            name: 'first_name',
                            type: 'input',
                            message: "Enter the employee's first name:"
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: "Enter the employee's last name:"
                        },
                     
                    ])
                    .then(employeeAnswer => {
                        // Create new employee
                        const employee = {
                            first_name: employeeAnswer.first_name,
                            last_name: employeeAnswer.last_name,
                            role_id: res.insertId, // Use the ID of the newly created role
                        };

                        db.query('INSERT INTO employee SET ?', employee, (err, res) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(`Employee ${employee.first_name} ${employee.last_name} added successfully!`);
                        });
                    });
            });
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employee_id',
                type: 'input',
                message: 'Enter the ID of the employee to update:'
            },
            {
                name: 'new_role_id',
                type: 'input',
                message: 'Enter the new role ID for the employee:'
            }
        ])
        .then(answer => {
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.new_role_id, answer.employee_id], (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Employee's role updated successfully!`);
                }
            });
        });
}
function deleteDepartment() {
    inquirer
        .prompt({
            name: 'departmentId',
            type: 'input',
            message: 'Enter the ID of the department to delete:'
        })
        .then(answer => {
            db.query('DELETE FROM department WHERE id = ?', answer.departmentId, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Department with ID ${answer.departmentId} deleted successfully!`);
                }
            });
        });
}

function deleteRole() {
    inquirer
        .prompt({
            name: 'roleId',
            type: 'input',
            message: 'Enter the ID of the role to delete:'
        })
        .then(answer => {
            db.query('DELETE FROM role WHERE id = ?', answer.roleId, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Role with ID ${answer.roleId} deleted successfully!`);
                }
            });
        });
}

function deleteEmployee() {
    inquirer
        .prompt({
            name: 'employeeId',
            type: 'input',
            message: 'Enter the ID of the employee to delete:'
        })
        .then(answer => {
            db.query('DELETE FROM employee WHERE id = ?', answer.employeeId, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Employee with ID ${answer.employeeId} deleted successfully!`);
                }
            });
        });
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, deleteDepartment, deleteRole, deleteEmployee, startApp };


