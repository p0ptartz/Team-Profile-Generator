const inquirer = require("inquirer")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const fs = require("fs")


let employeeInfo = []

// ask manager questions - then take that data and create HTML card. - then ask LIST - if engineer, ask engineerQ's - if intern, ask intern q's -  create card for each - if finished log "Thanks You"

init = () => {
    employeeInfo = [];
    inquirer.prompt(managerQuestions)
        .then((data) => {
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber)
            employeeInfo.push(manager)
            console.log(employeeInfo)
            employeeList()
        })
}

const managerQuestions = [{
    type: "input",
    name: "managerName",
    message: "What is your name?",
},
{
    type: "input",
    name: "managerId",
    message: "What is your employee ID?"
},
{
    type: "input",
    name: "managerEmail",
    message: "What is your email address?"
},
{
    type: "input",
    name: "officeNumber",
    message: "What is your office number?"
}
]

function engineerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your employee ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your email address?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub account:"
        }
    ]).then((data) => {
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.github)
        employeeInfo.push(engineer)
        setTimeout(() => {
            employeeList()
        })
    }, 200)
}

function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is your employee ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your email address?"
        },
        {
            type: "input",
            name: "schoolInfo",
            message: "What school did you attend??"
        }
    ]).then((data) => {
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.schoolInfo)
        employeeInfo.push(intern)
        setTimeout(() => {
            employeeList()
        })
    }, 200)
}

function employeeList() {
    inquirer.prompt({
        type: "list",
        name: "employeeRole",
        choices: ["Engineer", "Intern", "Finished"]
    })
        .then((data) => {
            if (data.employeeRole === "Engineer") {
                //engineer question function
                engineerQuestions()

            } else if (data.employeeRole === "Intern") {
                internQuestions()

            } else {
                generateHTML()
                console.log("YOUR TEAM HAS BEEN CREATED!")
            }
        })
}

function generateHTML() {
    let html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles.css">
        <title>My Team</title>
    </head>
    
    <body>
        <header>
            <h1>MY TEAM</h1>
        </header><main class = "card-container">`;

    for (const employee of employeeInfo) {
        html += `
        <div class="card">
          <div class="name">
            <p class="card-name">${employee.name}</p>
            <p class="card-title">${employee.getRole()}</p>
          </div>
          <div class="card-body">
            <div class="card-items">
              <p class="card-1">ID: ${employee.id}</p>
              <p class="card-2">EMAIL: <a href="mailto:${employee.email}">${employee.email}</a> </p>
              <p class="card-3">${employee instanceof Manager ? 'Office Number: ' + employee.officeNumber : employee instanceof Engineer ? `GitHub: <a href='https://github.com/${employee.github}'>${employee.github}</a>` : 'School: ' + employee.school
            }</p>
            </div>
          </div>
        </div>`;
    }
    html += `</main> </body> </html>`
    fs.writeFileSync("./src/your-team.html", html);
}

init()
