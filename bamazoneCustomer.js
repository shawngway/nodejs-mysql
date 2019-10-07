const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
    createInvoice();
});

function createInvoice() {
    inquirer
        .prompt([
            {
                name: 'choice_id',
                message: 'Enter product id',
                type: 'number'
            },
            {
                name: 'purchase_amount',
                message: 'Enter the number you would like to purchase',
                type: 'number'
            }
        ])
        .then(function (ans) {
            console.log("product id: " + ans.choice_id)

            console.log("product quantity wanting to purchase: " + ans.purchase_amount);
        })
};