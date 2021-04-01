//Taking away un-declared variables by using strict mode.
'use strict';

//Inserting our dependencies.
const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

//init local host to display the connection from the webpage
const connection = mysql.createConnection({
  host: 'localhost',

  // website port
  port: 3306,

  // username
  user: 'root',

  // My password to mysql and the database were pulling from
  password: 'Angel40002311',
  database: 'employee.js',
});


//Inserting the messages for our users to see, in order for them to make selections.
const Messages = {
employees: "View Employees ",
department: "Sort employees by department",
managers: "View the Managers",
insertEmployee: "Insert new Employee",
deleteEmployee: "Delete an Employee",
updateStatus: "Update Employee status",
updateManagers: "Update Who The Managers Are",
bye: "Bye"
};
//initiating user options
function prompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Here are your options:",
        choices: [
            promptMessages.employees,
            promptMessages.department,
            promptMessages.managers,
            promptMessages.insertEmployee,
            promptMessages.deleteEmployee,
            promptMessages.updateStatus,
            promptMessages.updateManagers,
            promptMessages.bye

        ]
    })
    //Initiating a submit action when making a selection
    .then(submit => {
        console.log("submit", submit);
        
        switch (submit.action) {
            
    case promptMessages.employees:
    employees();
    break;
            
      case promptMessages.department:
    department();
     break;
            
     case promptMessages.managers:
    managers();
     break;
            
     case promptMessages.insertEmployee:
    insertEmployee();
    break;
           
    case promptMessages.deleteEmployee:
    delete("remove");
    break;
                        
      case promptMessages.updateStatus:
    delete("update");
    break;
            
    case promptMessages.updateManagers:
    updateManagers();
    break;
            
     case promptMessages.bye:
    connection.end();
    break;
        }
    });
}
//Setting up a function to pull all of the employees in the table
function employees() {
    const query = `Select employee.id, employee.first_name, 
    employee.last_name, status.title, department.name AS department, status.salary,
    CONCAT(manager.first_name, '', manager FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN status ON (status.id = employee.status_id)
    INNER JOIN department ON (department.id = status.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('Employees');
        console.table(res);
        prompt();
    });
}
//Pulling all data to put into the department section
function department() {
    const query = `Select department.name AS department, status.title, employee.first_name, employee.last_name
     FROM employee 
    LEFT JOIN status on (status.id = employee.status_id
    LEFT JOIN department ON (department.id = employee.department_id)
    INNER JOIN department ON (department.id = status.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('Department');
        console.table(res);
        prompt();
    });
}
//Inputting all the data to the managers section of the table
function managers() {
    const query = `Select CONCAT(manager.first_name, '', manager.last_name)
    As manager, department.name AS department, employee.id, employee.first_name,
    employee.last_name 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN status ON (status.id = employee.status_id && employee_manager_id != 'NULL')
    INNER JOIN department ON (department.id = status.department_id)
    ORDER BY manager;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('Managers');
        console.table(res);
        prompt();
    });
}
//Initiating the pull to put all the data in the status section
function updateStatus() {
    const query = `Select status.id, employee.id, 
    employee.first_name, employee.last_name, department.name AS department,
    FROM employee
    LEFT JOIN status ON (status.id = employee.status_id)
    LEFT JOIN department ON (department.id = status.department_id)
    ORDER BY status.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('Status');
        console.table(res);
        prompt();
    });
}
//Creating a function to return that you added another employee and see there status
    async function insertEmployee() {
        const insert = await inquirer.prompt(askName());
        connection.query('SELECT status.id, status.title FROM status  ORDER BY status.id;', async (err, res) =>{
            if (err) throw err;
            const { status } = await inquirer.prompt([
                {
                    name: 'status',
                    type: 'list',
                    choices: () => res.map(res => res.title),
                    message: 'Employee status?:'
                }
            ]);
        });
    }
// 
    connection.query('SELECT * FROM employee', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.first_name} ${res.last_name}`);
        choices.push('none');
        let { manager } = await inquirer.prompt([
            {
                name: 'manager',
                type: 'list',
                choices: choices,
                message: 'Manager Options:'
            }
        ]);

        let managersId;
        let managersName;
        if (managers === 'none') {
            managersId = null;
        }
        else {
            for (const data of res) {
                data.fullName = `${data.first_name} ${data.last_name}`;
                if (data.fullName === managers) {
                    managersId = data.id;
                    managersName = data.fullName;
                    console.log(managersId);
                    console.log(managersName);
                    continue;
                }
            }
        }
//Adding employees
        console.log('added');
        connection.query(
            {
                first_name: insertname.first,
                last_name: insertname.last,
                status_id: statusId,
                managers_id: parseInt(managersId)
            },
            (err, res) => {
                if (err) throw err;
                prompt();
            }
        );
    });
//When we delete an employee it will return a status update
then(answer =>{
       if (input === 'delete' && answer.action === "yes") removeEmployee ();
       else if (input === 'status' && answer.action === "yes") updateStatus (); 
       else Employees();
   });
//Function to properly delete an employee
   async function deleteEmployee() {

    const answer = await inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Remove employee below",
        }
    ]);
   
    connection.query('REMOVE FROM employee WHERE?',
    {
        id: answer.first
    },
    function (err) {
        if (err) throw err;
    }
    )
    console.log('Employee is removed');
    prompt();

};
//Function for user to input employees ID
function askId() {
    return ([
       {
        name: "name",
        type: "input",
        message: "Employee ID?: "
       }
    ]);
}
//Cleaning up the data were returning
async function updateStatus() {
    const employeesId = await inquirer.prompt(askId());
    connection.query('SELECT status.id, status.title FROM status ORDER BY status.id;', async (err, res) => {
        if (err) throw err;
        const { status } = await inquirer.prompt([
            {
                name: 'status',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'New status?:'
            }
        ]);
    
let statusId; 
for (const row of res) {
    if (row.title === role) {
        statusId = row.id;
        continue;
    }
}
//Making sure you display the updates 
connection.query(`UPDATE employees SET status_id = ${statusId}
WHERE employees.id = ${employeesId.name}`, async (err, res) => {
    if(err) throw err;
    console.log('Status updated')
    prompt();
});
    });
}

function askName() {
    return ([
        {
            name: "first",
            type: "input",
            message: "First name:"
        },
        {
            name: "last",
            type: "input",
            message: "Last name:"
        }
    ]);
}
    
        
        
        
   //Creating a connection to the server     
const afterConnection = () => {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    afterConnection();
  });
}