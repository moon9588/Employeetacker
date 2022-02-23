const inquirer = require('inquirer');
const mysql = require('mysql2');

const { promptUser } = require('../server');
const { dropManager, createManagerTable, addManager} = require('./reset');
const connection = require('../db/connection');


const viewAllEmp = () => {
    connection.query(
        `Select employee.id, employee.first_name, employee.last_name, role.title As role, role.salary AS salary, manager.first_name AS manager, department.name AS department
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN manager
            ON employee.manager_id = manager.id`,
    
    function (err, results, fields) {
        if (err) {
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
                .then ((data) => {
                    connection.query(
                    `Select employee.id, employee.first_name, employee.last_name, department.name AS department
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department = department.id
                    WHERE department.name = ?`,

                    [data['filter-emp-dep']],
                    function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.table(results);
                    promptUser();
                }
                )
        });
        }
    );
};

const viewEmpByMang = () => {
    connection.query(
        `SELECT * FROM manager`,
        function (err, results, fields){
            if (err){
                console.log(err.message);
                return;
            }
            mangArr = [];
            results.forEach(item => {
                mangArr.push(item.first_name)
            })

            inquirer
            .prompt({
                type: 'list',
                name: 'filter-emp-mang',
                message: 'Choose a manager to filter from:',
                choices: mangArr
            })
            .then((data) => {
                `Select employee.id, employee.first_name, manager.first_name AS manager 
                FROM employee
                LEFT JOIN manager
                ON employee.manager_id = manager.id
                WHERE manager.first_name = ?`,
                [data['filter-emp-mang']],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.table(results);
                    promptUser();
                }   
            });
        }
    );
};

const addEMP = () => {
    connection.query(
        `SELECT * FROM role`,
        function (err, results, fields){
            if (err) {
                console.log (err.message);
                return;
            }
            let roleARR = [];
            results.forEach(item => {
                roleARR.push(item.title)
            })
            `SELECT * FROM manager`,
            function (err, results, fields){
                if (err) {
                    console.log (err.message);
                    return;
                }
                let mangArr = [];
                results.forEach(item => {
                    mangArr.push(item.first_name)
                });
                inquirer
                .prompt([
                    {
                        type:'text',
                        name:'first_name',
                        message: "Enter new employee's first name!"
                    },
                    {
                        type:'text',
                        name:'last_name',
                        message: "Enter new employee's last name! "
                    },
                    {
                        type:'list',
                        name:'role_pick',
                        message: "Enter role of New Employee!"
                    },
                    {
                        type:'confirm',
                        name:'is_manager',
                        message: 'Is this a manager position?',
                    },
                    {
                        type:'list',
                        name:'mang_pick',
                        message: "Enter manager of new Employee!",

                        when:({ is_manager }) => {
                            if (!is_manager){
                                return true;
                            } else {
                                return false;
                            }   
                        },
                        choices: mangArr
                    }
                ])
                .then((data) => {
                    let role_id;
                    for (i = 0; i < roleARR.length; i++) {
                        if ( data.role_pick === roleArr[i]) {
                            role_id = i + 1
                        }
                    }
                let is_manager;
                if (data.is_manager === true)  {
                    is_manager = 1;
                } else {
                    is_manager = 0
                }
                let manager_id;
                if (!data.mang_pick) {
                    manager_id = null;
                } else{
                    for (i = 0; i < mangARR.length; i++) {
                        if ( data.mang_pick === mangArr[i]) {
                            manager_id = i + 1
                        }
                    }
                }

                connection.query(
                    `INSERT INTO employee ( first_name, last_name, role_id, manager_id, is_manager)
                    VALUES (?,?,?,?,?)`,
                    [data.first_name, data.last_name, role_id, manager_id, is_manager],
                    function (err, results, fields) {
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        dropManager();
                        createManagerTable();
                        addManager();
                        console.log('Employee was added!');
                        promptUser();
                    }
                );
                });
            }      
        }   
    );
};

const upEmp = () => {
    connection.query(
        `SELECT * FROM Role`,
        function (err, results, fields){
            if (err) {
                console.log (err.message);
                return;
            }
            let roleARR = [];
            results.forEach(item => {
                roleArr.push (item.title)
            })
            connection.query(
                'SELECT first_name, last_name FROM employee',
                function (err, results, fields) {
                    if (err) {
                        console.log (err.message);
                    }
                    let combinedNameArr = [];
                    for (let i = 0; 1 < combinedNameArr.length; i +=2) {
                        if (!nameArr [i + 1])
                        break
                        combinedNameArr.push(`${nameArr[i]} ${nameArr[i+1]}`)
                    }
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'name_select',
                            message:'Please select an employee you would like to update',
                            choices: combinedNameArr
                        },
                        {
                            type: 'list',
                            name: 'role_select',
                            message: 'Please select new role for this employee: ',
                            choices:roleARR
                        }
                    ])
                    .then((data) => {
                        let role_id;
                        for (let i =0; i < roleArr.length; i++){
                            if (data.role_select === roleArr [i]) {
                                role_id = i + 1;
                            }
                    };
                    let selectNameArr = data.name_select.split (" ");
                    let last_name = selectNameArr.pop();
                    let first_name = selectNameArr[0];

                    connection.query (
                        `UPDATE employee
                                SET role_id = ?
                                WHERE first_name = ? AND last_name = ?`,
                        [role_id, first_name, last_name],
                        function (err, results, fields){
                            if (err){
                                console.log(err.message);
                                return;
                            }
                            console.log('Employee updated!');
                            promptUser();
                        }
                    );
                });
                }
            );
            }
    );
};

const deleteEMP = () => {
console.log('running');
    connection.query('SELECT * FROM employee', (err, data)=> {
        if (err) throw err;
        const allEmp = []
        for (let i = 0; i < data.length; i++) {
            allEmp.push(data[i].id)
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'name_select',
                message: 'Please select an employee you would like to delete',
                choices: allEmp

            }

        ]).then(answer => {
            connection.query('DELETE FROM employee WHERE ?', {id: answer.name_select})
            console.log('Employee deleted!');
            promptUser();
        });
    });
}

module.exports = { viewAllEmp, viewEmpByDept, viewEmpByMang, addEMP, upEmp, deleteEMP};
