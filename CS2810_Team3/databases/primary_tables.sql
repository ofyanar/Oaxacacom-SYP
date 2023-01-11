
/*
 *some of these tables may be updated at run-time
 *information about branches 
 */
CREATE TABLE Branches(
	br_id int NOT NULL,
	city varchar(50) NOT NULL,
	location varchar(50) NOT NULL,
	no_tables int NOT NULL,
	is_open varchar(5) NOT NULL,
    PRIMARY KEY (br_id),
	CHECK(no_tables BETWEEN 1 AND 25),
	CHECK(is_open = 'true' OR is_open = 'false')
);

/*
 *tables that would be in branches max 
 *tables a branch can have are 25 (for now)
 *
 */
CREATE TABLE Tables(
	table_number int NOT NULL ,
	available varchar(5) NOT NULL,
	PRIMARY KEY (table_number),
	CHECK(table_number BETWEEN 1 AND 25),
	CHECK(available = 'true' OR available = 'false')
);

/*
 *information about individual menu items.
 */
CREATE TABLE Menu (
	menu_no int NOT NULL,
    dish varchar(100) NOT NULL,
	dish_type varchar(50) NOT NULL,
    calories int NOT NULL,
	diet_pref varchar(50) NOT NULL,
    allergies varchar(100) NOT NULL,
    availability int NOT NULL,
    dish_price decimal(5,2) NOT NULL,
    PRIMARY KEY (menu_no),
	CHECK (availability>=0),
	CHECK (dish_type='burritos' OR dish_type='tacos' OR dish_type='sides' OR dish_type='drinks' OR dish_type='deserts')
);

/* 
 *employee table stores the login details of employees. accessed when an employee is logging in. 
 */
CREATE TABLE Employee (
    employee_id int NOT NULL,
	br_id int NOT NULL,
    password varchar(30) NOT NULL,
    position varchar(20) NOT NULL,
    PRIMARY KEY (employee_id),
	FOREIGN KEY (br_id) REFERENCES Branches(br_id),
	CHECK (position='Kitchen Staff' OR position='Waiter' OR position='Manager')
);

/* 
 *tracks the numbers for orders baskets queues sales regardless of branch.
 *each row's current_val is populated with a number value
 */
CREATE TABLE number_tracker(
	track_for varchar(10) NOT NULL,
	current_value int NOT NULL,
	PRIMARY KEY (track_for),
	CHECK (track_for='order' OR track_for = 'basket' OR track_for='queue' OR track_for = 'sale' OR track_for = 'empid' )
);
