DROP DATABASE IF EXISTS bamazon;


CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("turtle", "reptile", 50.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("frog", "amphibian", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tiger", "mammal", 3000.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicken", "mammal", 18.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("goat", "mammal", 89.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("horse", "mammal", 10000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dolphin", "mammal", 5000.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polar bear", "mammal", 18000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lion", "mammal", 20000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("penguins", "bird", 800, 8);
