var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors/safe");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // username
  user: "root",
  // password
  password: "Jake0320",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  processOrder();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    console.log('ID | Product | Price');
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
    }
    console.log("-----------------------------------");
  });
}
// ============================================================

function processOrder() {
  // query the database for all items sold
  connection.query("SELECT * FROM bamazon.products", function (err, res) {
    if (err) throw err;
    // once items displayed, prompt the user for order
    inquirer.prompt([
      {
        name: "choice",
        type: "input",
        message: "What is the ID of the animal you would like to place an order on?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of the animal(s) would you like to buy?"
      }
    ])
      .then(function (answer) {

        var chosenId = answer.choice - 1
        var chosenProduct = res[chosenId]
        var chosenQuantity = answer.quantity
        // check quantity availability
        if (chosenQuantity <= chosenProduct.stock_quantity) {
          var new_stock = parseInt(chosenProduct.stock_quantity) - parseInt(chosenQuantity);
          console.log(colors.green("The total for " + answer.quantity + " " + chosenProduct.product_name + " is: $" + chosenProduct.price.toFixed(2) * chosenQuantity));

          connection.query(
            "UPDATE bamazon.products SET ? WHERE ?",
            [{
              stock_quantity: new_stock
            },
            {
              item_id: chosenProduct.item_id
            }
            ], function (error) {
              // if available order and updated amount above
              if (error) throw err;
              console.log(colors.green("Order placed successfully!"));
              processOrder();
            });
        } else {
          // if not enough product display amount and start again
          console.log(colors.red("Sorry, insufficient Quanity! There are only " + chosenProduct.stock_quantity + " in stock."));
          processOrder();
        }
      })
  })
}
