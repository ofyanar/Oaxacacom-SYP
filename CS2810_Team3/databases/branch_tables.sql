
/* 
 *shows availability of tables within branches, modified at 
  *runtime when a customer reserves a table.
 */
CREATE TABLE branch_tables(
	SELECT *
	FROM (SELECT * FROM Branches, Tables) AS BTables
	WHERE BTables.table_number<=BTables.no_tables
);

