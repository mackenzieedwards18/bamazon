var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({

  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});





  connection.query('SELECT * FROM products', function(err, res){
      console.log("Welcome to Bamazon");
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + "\nName of Product: " + res[i].product_name + "\nPrice: " + "$" + res[i].price + "\n=======================");
    }
  })

  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    inquirer.prompt([{
      name: "productList",
      list: function() {
          var productsArr = [];
          for (var i = 0; i < res.length; i++) {
              productsArr.push(res[i].item_id);
          }
          return productsArr;
      },
      message: "Please type the ID number of the item you want to purchase.",
  }, {
      name: "unitNum",
      message: "How many would you like to buy?",

  }]).then(function(custAnswer) {

      console.log(custAnswer);
      var custChoiceID = custAnswer.productList.trim();
      console.log(custChoiceID);
     
      var arrNum = custChoiceID - 1;
      var chosenProduct = res[arrNum];
      console.log(arrNum);

     
      console.log("You chose:  " + custChoiceID + " | " + chosenProduct.product_name);

    
      var unitNum = custAnswer.unitNum.trim();
      console.log("Numbers of items you wanted to purchase: " + unitNum);

      var itemStocks = chosenProduct.stock_quantity;

      if (unitNum < chosenProduct.stock_quantity) {
          var newQuantity = chosenProduct.stock_quantity - unitNum

          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: newQuantity
          }, {
              item_id: chosenProduct.item_id
          }], function(err) {
              if (err) throw err;
              console.log("Your order has been placed!");
              console.log("Total cost: $" + (unitNum * chosenProduct.price));
          })
      } else {
        console.log("------------------------");
        console.log("Insufficient quantity."); 
        console.log("------------------------");
        console.log("We don't have that many in stock, try a lower quantity");
      };
  });
});
    

