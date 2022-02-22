const inquirer = require('inquirer');
const mysql = require('musql2');

const { promptUser } = require('../server');
const connection = require('../db/connection');

const viewAllRole = () => {
    connection.query(
        `SELECT role.id, role.title, role.salary, department.name
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    );
};

const addRole = () => {
    `SELECT * FROM department`,
    function (err, results, fields) {
        if (err) {
            console.log(err);
            return;
        }
        let deptArr = [];
        results.forEach(item => {
            deptArr.push(item.name)
        })
        inquirer
            .prompt ([
                {
                    type: 'text',
                    name: 'role_title',
                    message: 'Enter the name of the role to be added',
                },
                {
                    type: 'number',
                    name: 'salary',
                    message:'Enter the salary for this role DO NOT ENTER COMMAS OR PERIODS '
                },
                {
                    type: 'list',
                    type:'department',
                    message:'Please select the department where this role will be added',
                    choices:deptARR
                }
            ])
            .then((data) => {
                let department_id;
            
                for (let i = 0; i < department_id.length; i++) {
                    if (deptArr[i] === data.department_id) {
                        department_id = i + 1;

                    };
                };

                connection.query(
                    `INSERT INTO role (title, salary, department_id)
                        VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (err, results, fields){
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.log('Role added!')
                            promptUser();
                        }
                );               
            });
    }

};

module.exports = { viewAllRole, addrole};

