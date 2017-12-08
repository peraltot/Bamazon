var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Jake0320",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  processOrder();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
    }
    console.log("-----------------------------------");
  });
}



// ============================================================

function processOrder() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM bamazon.products", function(err, res) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([
        {
          name: "choice",
          type: "input",
          // choices: function() {
          //   var orderArray = [];
          //   for (var i = 0; i < res.length; i++) {
          //     orderArray.push(res[i].product_name);
          //   }
          //   return orderArray;
          // },
          message: "What is the ID of the item you would like to place an order on?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many of the items would you like to buy?"
        }
      ])
      .then(function(answer) {

       var chosenId = answer.choice -1
            var chosenProduct = res[chosenId]
            var chosenQuantity = answer.quantity
            if (chosenQuantity < res[chosenId].stock_quantity) {
                console.log ("Order placed successfully!")
                console.log("The total for " + answer.quantity + " " + res[chosenId].product_name + " is: $" + res[chosenId].price.toFixed(2) * chosenQuantity);
    

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: res[chosenId].stock_quantity - chosenQuantity
                }, {
                    id: res[chosenId].id
                }], function(err, res) {
                    //console.log(err);
                    processOrder();
                });

            } else {
                console.log("Sorry, insufficient Quanity! There are only " + res[chosenId].stock_quantity + " in stock.");
                processOrder();
            }
        })
    })
}
