
/*
 *basket of a customer, doesn't have a primary key as 
 *it is the multi-valued attribute for the derived customer_orders table. 
 */
CREATE TABLE Basket(
	basket_no int NOT NULL,
	menu_no int NOT NULL,
	quantity int NOT NULL
);


/* 
 *a customers order, it is used to derive the customer_orders db table.
 */
CREATE TABLE Cust_Order (
    order_number int NOT NULL,
    basket_no int NOT NULL,
    total varchar(6) NOT NULL,
	order_time datetime NOT NULL,
    table_number int NOT NULL,
	br_id int NOT NULL,
	receipt_asked varchar(5) NOT NULL,
    PRIMARY KEY (order_number),
	FOREIGN KEY (br_id) REFERENCES branches(br_id),
	CHECK(receipt_asked = 'true' OR receipt_asked = 'false')
);

/* 
 *holds general information about orders. used to derive customer_orders table. 
 */
CREATE TABLE Orders (
    queue_number int NOT NULL,
    order_number int NOT NULL,
    served_status varchar(5) NOT NULL,
    ready_status varchar(5) NOT NULL,
    PRIMARY KEY (queue_number),
    FOREIGN KEY (order_number) REFERENCES Cust_Order(order_number),
	CHECK (queue_number>0),
	CHECK(served_status = 'true' OR served_status = 'false'),
	CHECK(ready_status = 'true' OR ready_status = 'false')
);

/*
 *This table is used to track which customers have requested a waiter to their table, for assistance.
 *the values stored can only be accessed by waiters.
 */
CREATE TABLE Request_Waiter(
	request_time DATETIME NOT NULL,
	br_id int NOT NULL,
	table_num int NOT NULL,
	PRIMARY KEY (request_time),
    FOREIGN KEY (br_id) REFERENCES Branches(br_id)
);

/* 
 *tracks sales details of each chain branch. 
 */
CREATE TABLE Sales (
	sale_no int NOT NULL,
    br_id int NOT NULL,
	total varchar(6) NOT NULL,
    PRIMARY KEY (sale_no),
    FOREIGN KEY (br_id) REFERENCES Branches(br_id)
);