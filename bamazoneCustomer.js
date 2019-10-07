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
    productMenu();
});

function productMenu(){
    console.log("These are the products in stock\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
        console.log("product id: " + res[i].item_id);
        console.log("product name: " + res[i].product_name);
        console.log("department: " + res[i].department_name);
        console.log("price: " + res[i].price);
        console.log("In stock: " + res[i].stock_quantity);
        console.log("---------------");
        }
        createInvoice();
    })
}

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
            readInvoice(ans.choice_id, ans.purchase_amount)
        })
};


function readInvoice(choice, amount){
    console.log("product id: " + choice)
    console.log("product quantity wanting to purchase: " + amount);
    stockCheck(choice, amount);
};

function stockCheck(id, stock){

}