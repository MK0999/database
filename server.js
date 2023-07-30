
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');




// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Agam123',
    database: 'data_db'
  },
  console.log(`Connected to the data_db database.`)
);
db.connect(() => {
  menu()
})
function menu() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'select from following options',
      name: 'data',
      choices: ['view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role']

    },

  ])
    .then(response => {
      if (response.data === "view all departments") {
        viewDepartment()
      }
      else if (response.data === "view all roles") {
        viewRoles()
      }
      else if (response.data === "view all employees") {
        viewEmployee()
      }
      else if (response.data === "add a department") {
        addDepartment()
      }
      else if (response.data === "add a role") {
        addRole()
      }
      else if (response.data === "add an employee") {
        addEmployee()
      }

    })
}
function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    menu()
  });

}
function viewDepartment() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    menu()
  });
}
function viewEmployee() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    menu()
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'Input',
      message: 'Enter department name to add',
      name: 'department'
    },
  ])

    .then(response => {
      const departmentName = response.department
      db.query('INSERT INTO department(dep_name) VALUES (?)', [departmentName], function (err, result) {
        if (err) throw err;
        console.log(`Added department ${response.department} to the database!`);

        menu()
        console.log(response.department)
      })
    })
}

function addRole() {
  db.query("select dep_name name, id value from department", (err, data) => {


    inquirer.prompt([
      {
        type: 'input',
        message: 'Enter the title',
        name: 'title'
      },
      {
        type: 'input',
        message: 'Enter the salary',
        name: 'salary'
      },
      {
        type: 'list',
        message: 'Enter the department',
        name: 'depname',
        choices: data

      },
    ])
      .then(response => {
        const title = response.title
        const salary = response.salary
        const departmentID = response.depname;

       


        db.query('INSERT INTO role(title,salary,department_id) VALUES (?,?,?)', [title, salary, departmentID], function (err, result) {
          if (err) throw err;

          viewDepartment()
          console.log(response.title)
        })

      })
  })
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'Input',
      message: 'Enter the firstname',
      name: 'first'
    },
    {
      type: 'Input',
      message: 'Enter the lastname',
      name: 'last'
    },
    {
      type: 'Input',
      message: 'Enter the role',
      name: 'role',
      choices: ['Sales lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Lawyer', 'Lawyer']

    },
    {
      type: 'list',
      message: 'Enter the manager',
      name: 'manager',
      choices: ['John', 'Mike', 'Ashley', 'Kevin', 'Kunal', 'Malia', 'Sarah', 'Tom']

    },
  ])
    .then(response => {
      const firstname = response.first
      const lastname = response.last
      const role = response.role
      const manager = response.manager

      db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [firstname, lastname, role, manager], function (err, result) {
        if (err) throw err;
        menu()
        console.log(response.firstname)
      })

    })
}




