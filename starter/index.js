const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
inquirer.prompt([
    {
        type: 'input',
        message: 'Can I get the manager\'s name?',
        name: 'managerName'
    },
    {
        type: 'input',
        message: 'Can I get the manager\'s id?',
        name: 'managerId'
    },
    {
        type: 'input',
        message: 'Can I get the manager\'s email?',
        name: 'managerEmail'
    },
    {
        type: 'input',
        message: 'Can I get the manager\'s office number?',
        name: 'managerOfficeNo'
    }
]).then(res => {
    // populate manager info
     const manager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOfficeNo);
     team.push(manager);
     promptNextEmployee();
});

const promptNextEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to add?',
            choices: ['Engineer', 'Intern', 'No more employees'],
            name: 'employeeList'
        },
    ]).then(res => {
        if(res.employeeList === 'Engineer'){
            promptEngineer();
        } else if (res.employeeList === 'Intern') {
            promptIntern();
        } else {
            fs.writeFile(outputPath, render(team), (err) => err ? console.log(err) : console.log('saved!'));
        }
        })
};
const promptEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Can I get the engineer\'s name?',
            name: 'engineerName'
        },
        {
            type: 'input',
            message: 'Can I get the engineer\'s id?',
            name: 'engineerId'
        },
        {
            type: 'input',
            message: 'Can I get the engineer\'s email?',
            name: 'engineerEmail'
        },
        {
            type: 'input',
            message: 'Can I get the engineer\'s github profile?',
            name: 'engineerGithub'
        }
    ]).then(res => {
        const engineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.engineerGithub );
        team.push(engineer);
        promptNextEmployee();
     })
}
const promptIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Can I get the intern\'s name?',
            name: 'internName'
        },
        {
            type: 'input',
            message: 'Can I get the intern\'s id?',
            name: 'internId'
        },
        {
            type: 'input',
            message: 'Can I get the intern\'s email?',
            name: 'internEmail'
        },
        {
            type: 'input',
            message: 'Can I get the intern\'s school?',
            name: 'internSchool'
        }
    ]).then(res => {
        const intern = new Intern(res.internName, res.internId, res.internEmail, res.engineerSchool);
        team.push(intern);
        promptNextEmployee();
     })
}
//validation:
//check the name is capitalized
//check the aged provided are numbers / and office num 
//check stings input if possible
