const inquirer = require('inquirer');
const mysql = require ('mysql2');
const { promptUser } = require ('../server');
const connection = require ('../db/connection');

const viewAllDep = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err,results, fields) {
            if (err){
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
}

const addDep = () => {
    inquirer
        .prompt({
            type: 'text',
            name: 'dept_name',
            message: 'Enter name of new department to add it:'
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name) VALUES(?)`
                [data.dept_name],
                function (err, results, fields){
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log ('New department has been added!');
                    promptUser();
                    
                }
            )
        })
}

module.exports = {viewAllDep, addDep};
