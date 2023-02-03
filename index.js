const inquirer = require("inquirer")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const fs = require("fs")

let employeeInfo = []
// ask manager questions - then take that data and create HTML card. - then ask LIST - if engineer, ask engineerQ's - if intern, ask intern q's -  create card for each - if finished log "Thanks You"

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

function employeeList() {
    inquirer.prompt({
        type: "list",
        name: "employeeRole",
        choices: ["Engineer", "Intern", "Finished"]
    })
        .then((data) => {
            if (data.employeeRole === "Engineer") {
                //engineer question function
                // push into array
            } else if (data.employeeRole === "Intern") {
                // intern question function
                // push into array
            } else {
                console.log("YOU DONE")
                // generate HTML???
            }
        })
}

init = () => {
    inquirer.prompt(managerQuestions)
        .then((data) => {
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber)
            employeeInfo.push(manager)
            console.log(employeeInfo)
            employeeList()
        })
}

init()
