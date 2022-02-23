const inquirer = require('inquiter');
const express = require ('exress');
const { viewAllDep } = require('./lib/department-methods');
const { viewAllRole } = require('./lib/role-methods');
const { viewAllEmp, deleteEMP, upEmp, viewEmpByDept, viewEmpByMang } = require('./lib/employee-methods');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const promptUser = () => {
    console.log (`
    ================
    Employee Tracker
    ================
    `);

    inquirer
    .prompt({
        type: 'list',
        name: 'all choices',
        message: 'This Command-line Application can help you with following choices. Please pick one',
        choices: [
            'View all department',
            'View all role',
            'View all employee',
            'Add a department',
            'All a role',
            'View all employee by department',
            'View all employee by manager',
            'Finished',
        ]
    })
    .then(()=> {
        switch (data['all choices']){
            case 'View all department':
                viewAllDep();
                break;
            case 'View all role':
                viewAllRole();
                break;
            case 'View all employee':
                viewAllEmp();
                break;
            case 'Add a department':
                addDep();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a employee':
                addEmp();
                break;
            case 'delete an employee':
                deleteEMP();
                break;
            case 'Update an emplolyee role':
                upEmp();
                break;
            case 'View all employee by department':
                viewEmpByDept();
                break;
            case 'View all employee by manager':
                viewEmpByMang();
                break;
            case 'Finished':
                break;  
        }
    })

}

app.use((req, res)=> {
    res.status(404).end;
});

app.listen(PORT, ()=>{
    console.log('Server running on port ${PORT');
});

module.exports = {promptUser}
const {viewAllEmp, viewAllDep, viewEmpByMang, addEmp, upEmp, deleteEMP} = require('./lib/employee-methods');
const { viewAllDep, addDep} = require('./lib/department-methods');
const {viewAllRole, addRole} = require ('./lib/role-methods');
promptUser()
