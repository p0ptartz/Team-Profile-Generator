const inquirer = require("inquirer")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const fs = require("fs")





const managerQuestions = [{
    type: "input",
    name: "managerName",
    message: "What is your name?",
}
]

init = () => {
    inquirer.prompt(managerQuestions)
}

init()
