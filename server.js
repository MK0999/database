
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
      else if (response.data === "update an employee role"){
        updateEmployeeRole()
      }

    })
}
function viewRoles() {
  // db.query('SELECT * FROM role', function (err, results) {
  db.query(
    'SELECT role.id, role.title, department.dep_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id',
    function (err, results) {
      console.table(results);
      menu();
    }
  );

}
function viewDepartment() {
  // Query database
  db.query('', function (err, results) {
    console.table(results);
    menu()
  });
}
function viewEmployee() {
  const query= `SELECT employee.id, employee.first_name, employee.last_name, role.title , department.dep_name AS department ,role.salary, employee.first_name As manager
    FROM employee
     LEFT JOIN role ON employee.role_id = role.id
     LEFT JOIN department ON role.department_id = department.id
     LEFT JOIN  employee manager ON manager.id = employee.manager_id`;
  db.query(query,(err, results) =>{
    if(err){
      console.log(err);
    }
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

            viewRoles()

          })

        })
  })
}

function addEmployee() {
  db.query("select title name, department_id value from role", (err, data) => {
    console.log(data),
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
      type: 'list',
      message: 'Enter the role',
      name: 'role',
      choices: data

    },
    
  ])
    .then(response => {
      const firstname = response.first
      const lastname = response.last
      const role = response.role
      //const manager = response.manager

      db.query('INSERT INTO employee(first_name, last_name, role_id) VALUES (?,?,?)', [firstname, lastname, role], function (err, result) {
        if (err) throw err;
        viewEmployee()
        
      })

    })
})

}

function updateEmployeeRole() {
  const Employees= "Select CONCAT(first_name,' ',last_name) name, id value from employee";
  const Roles = "Select title name, department_id value FROM role ";
  db.query(Employees, (err, empdata) => {
    if(err) throw err;
    console.log(empdata)
    db.query(Roles, (err, roledata) => {
      if(err) throw err;
      console.log(roledata)
  inquirer.prompt([
    {
      type: 'list',
      message: 'Select the employee',
      name: 'first',
      choices: empdata
    },
    {
      type: 'list',
      message: 'Select the new role',
      name: 'last',
      choices: roledata
    },
    
    
  ])
    .then(response => {
      const employeeName = response.first
      const newRole = response.last
      

      db.query('INSERT INTO employee(first_name, role_id) VALUES (?,?)', [employeeName, newRole], function (err, result) {
        if (err) throw err;
        viewEmployee()
        
      })

    })
})
  })
}


