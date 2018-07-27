create database bamazon;

use bamazon;

create table products (
    item_id INT auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price decimal (10,2) not null,
    stock_quantity int not null,
    primary key(item_id),
);

use bamazon;

SELECT * FROM products;

insert into products (item_id, product_name, department_name, price, stock_quantity)
values ("Amazon Fire Stick", "Electronics", 39.99, 20),
("Ninja Professional Blender", "Appliances", 87.99, 30),
("Ralph Lauren Romance Perfume", "Beauty", 96.99, 10),
("Diamond Earrings", "Jewelry", 2500.00, 5),
("Monopoly", "Entertainment", 30.99, 25),
("iPad", "Electronics", 250.00, 30),
("Women's Zip-up Hoodie", "Women's Clothing", 25.99, 30),
("Keurig", "Appliances", 99.99, 25),
("Maybelline The Falsies Mascara", "Beauty", 5.99, 40),
("Shutter Island DVD", "Entertainment", 19.99, 10),
("Dove Bodywash", "Beauty", 11.99, 5);
