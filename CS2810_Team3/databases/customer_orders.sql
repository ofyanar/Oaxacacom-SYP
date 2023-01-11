
/* 
 *shows information about a customer order, to be viewed 
 *by restaurant employees certain employees see certain information
 *updated once an order is placed, certain employees can also update the table 
 */

CREATE TABLE customer_orders(
	SELECT queue_number, served_status, ready_status, cust_order.order_number AS order_number, basket_no, total, order_time, table_number, 
	br_id, receipt_asked
	FROM orders, cust_order
	WHERE orders.order_number = cust_order.order_number
);


