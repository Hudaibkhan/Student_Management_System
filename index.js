#! /usr/bin/env node
import inquirer from 'inquirer';
let studentid = Math.floor(10000 + Math.random() * 90000);
let mybalance = 0;
let student = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Enter your name",
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return "please enter a non-empty value.";
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Select any any one of course",
        choices: ["MS Office", "Python", "Typescript", "Java", "Web Designing"]
    }
]);
const coursefee = {
    "MS Office": 3000,
    "Python": 5000,
    "Typescript": 6000,
    "Java": 8000,
    "Web Designing": 4000
};
console.log(`\n Monthly Fees: ${coursefee[student.courses]} Rs`);
console.log(`\n Current Balance: ${mybalance} \n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select Paymnet method:",
        choices: ["Jazzcash", "Easypaisa", "Bank Transfer"]
    },
    {
        name: "amount",
        type: "number",
        message: "Transfer Money: ",
    }
]);
console.log(`\n You select payment method ${paymentType.payment} \n`);
const fees = coursefee[student.courses];
const paymentAmount = parseFloat(paymentType.amount);
function extraAmount() {
    if (paymentAmount > fees) {
        return paymentAmount - coursefee[student.courses];
    }
}
let extraFees = extraAmount();
if (paymentAmount == fees) {
    console.log(`Congradulation's you succsessfully enrolled in ${student.courses} program\n`);
    let answer = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "What would you like to do next",
        choices: ["View Status", "Exit"]
    });
    if (answer.select === "View Status") {
        console.log(`       *****Status*****\n`);
        console.log(`Name: ${student.name}`);
        console.log(`Student Id: ${studentid}`);
        console.log(`Course: ${student.courses}`);
        console.log(`Course Fees: ${coursefee[student.courses]}`);
        console.log(`Current Balance: ${mybalance == paymentAmount}`);
    }
    else {
        console.log(`\n<==== Exiting Student Management System ====>`);
    }
}
else if (paymentAmount >= fees) {
    console.log(`Congradulation's you succsessfully enrolled in ${student.courses}`);
    console.log(`\nYou paid extra Amount: ${extraFees}\nThis extra payment adjust in next month\n`);
    let answer = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "What would you like to do next",
        choices: ["View Status", "Exit"]
    });
    if (answer.select === "View Status") {
        console.log(`         *****Status*****\n`);
        console.log(`Name: ${student.name}`);
        console.log(`Student Id: ${studentid}`);
        console.log(`Course: ${student.courses}`);
        console.log(`Course Fees: ${coursefee[student.courses]}`);
        console.log(`Current Balance: ${mybalance += paymentAmount}`);
    }
    else {
        console.log(`\n<==== Exiting Student Management System ====>`);
    }
}
else {
    console.log("pay Full fees!");
}
