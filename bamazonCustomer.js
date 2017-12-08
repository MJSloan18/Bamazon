//INSTALL MYSQL NPM PACKAGE
//THE FOLLOWING CODE SYNCS YOU TO THE CREATED DATABASE IN PHPMYADMIN

var mysql = require("mysql");
var inquirer = require("inquirer");
// var prompt = require("prompt");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
})

connection.connect(function(err) {
    // if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    start();


});

//THE FOLLOWING CODE PULLS THE INFORMATION FROM THE DATABASE ONCE THE CONNECTION IS MADE//
//    AND IS DOCUMENTED IN THE TERMINAL ONCE THE APPLICATION IS LAUNCHED WITH NODE.   //

function afterConnection() {
    connection.query("SELECT * FROM products", function(error, result) {
        if (error) throw error;
        console.log(result);

        //IN THE CONSOLE LOG ABOVE, result[0] WILL LOG ALL OF THE INFORMATION FROM THE T-SHIRT PRODUCT //
        //TO NAVIGATE TO SPECIFIC DATA ENTRY, result[0].product_name WILL SHOW ONLY THE PRODUCT "T-SHIRTS"//

        connection.end();

    });
}

//====================================================

//Prompt user with 2 questions
//1. What is the ID for the product you want to purchase?
//2. How many units would you like to purchase?

var start = function() {
    inquirer.prompt({
        name: "desires",
        type: "rawlist",
        message: "What is the #ID for the product you wish to purchase?",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }).then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.desires === "1", "2", "3", "4", "5", "6", "7", "8", "9", "10") {
            promptOne();
        }

    })
}

function promptOne() {
    // prompt for info about the item being put up for auction
    inquirer.prompt({
        name: "item",
        type: "input",
        message: "How Many Units Would You Like To Purchase?"
    }).then(function readProducts() {
        console.log("Checking product availability...\n");
        connection.query("SELECT * FROM products", function(error, result) {
            // Log all results of the SELECT statement
            console.log(result);
        });
    })

}
