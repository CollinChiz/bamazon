var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "UtahUtes8",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        
        for(i=0; i<res.length; i++) {
            console.log("id: " + res[i].item_id);
            
            console.log("Product: " + res[i].product_name);
            console.log("Price: " + res[i].price + "\n");
            
        }
        
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the desired product?",
                name: "item_id"
            },
            {
                type: "input",
                message: "Input Quantity",
                name: "quantity"
            }
        ]).then(function(response) {
            
            var item = parseInt(response.item_id);
            var quantity = parseInt(response.quantity);
        
            for(i=0; i<res.length; i++) {
                
                if( item === parseInt(res[i].item_id)) {
                    console.log('Found it')
                    console.log(res[i])
                    if(res[i].stock_quantity < quantity) {
                        console.log("Not enough stock");
                    }

                
                };

            }

        
        })
    })
};