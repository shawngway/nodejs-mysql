const mysql = require("mysql");
const inquirer = require("inquirer");


let stock = 0;

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

function productMenu() {
    console.log("These are the products in stock\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
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


function readInvoice(choice, orderNum) {
    console.log("product id: " + choice)
    console.log("product quantity wanting to purchase: " + orderNum);
    stockCheck(choice, orderNum);
};

function stockCheck(id, orderSize) {
    connection.query("SELECT * FROM products WHERE item_id =" + id, function (err, res) {
        if (err) throw err;
        // console.log(res);
        order = parseInt(orderSize);
        stock = parseInt(res[0].stock_quantity)
        console.log("There are only " + stock + " " + res[0].product_name + " in stock");
        if (order > stock) {
            console.log("So sorry we do not have enough of those in stock! :(");
            //create a set timeout so this is shown before we re show the initialize
        } else{
            console.log("Your order has been place!")
            //as before place a set timeout so this is shown then we re show the initialize
            stockUpdate(id, order, stock);
        }
    })
}

function stockUpdate(item, order, stock){
    // console.log(item, order, stock);
    
}