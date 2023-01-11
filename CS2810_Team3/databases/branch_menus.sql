
/* 
 *menus of branches, each branch has same items but not the 
 *same availability (which may be modified at run-time) 
 */
CREATE TABLE branch_menus(
	SELECT *
	FROM Branches, Menu
);

