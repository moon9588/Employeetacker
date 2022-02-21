const inquirer = require('inquirer');
const mysql = require('mysql2');

const { promptUser } = require ('../server');
const { dropManager, createManagerTable, addManager} = require('./reset');
const connecation = require('../db/connection');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mamona09',
    database: 'staffing',

},
    console.log('Connected to the staffing database.')
);

const viewAllEmp = () => {
    connection.query (
        `Select employee.id, employee.first_name, employee.last_name, role.title As role, role.salary AS salary, manager.first_name AS manager, department.name AS department
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN manager
            ON employee.manager_id = manager.id` ,
    
    function (err, results, fields) {
        if (err){
            console.log(err.message);
            return;
        }
        console.table(results);
        promptUser()
    }
                
    );
};

const viewEmpByDept = () =>{
    connection.query(
        `SELECT * FROM department`,

        function (err,results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            deptArr = [];
            results.forEach(item => {
                deptArr.push(item.name)
            });
            inquirer
                .prompt({
                    type: 'list',
                    name: 'filter-emp-dep',
                    message: 'Choose a department to filter from:',

                    choices: deptArr
                })
                .then ((data) =>)
        }
    )
}
})
