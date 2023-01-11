# TeamProject2022_03

The main branch where the working copy of our project is.

The main page is Oaxaca.htm, the webpages within the 'other_web_pages' directory and sub-directories can be accessed through this page with the correct authorisation. e.g. a customer may be able to book a table at a restaurant only and only if the restaurant is marked as 'open', An employee can view their profile only with correct login details.

Once an customer books a table, the table is marked as filled in the database-table. After which they will be re-directed into a page where they will be 1. able to cancel their reservation at any time (unless an order is placed) 2. request help from a waiter, or cancel the request at will. 3. view menu-categories and their corresponding menu-items, filter through allergens and dietary preferences at will and have the freedom to select a certain quantity within that branch's stock at the time. 4. once they are happy with their order have the ability to view and checkout their basket which will then directly be inserted into the relevant database that will allow the employees concerned to see their order. 


...




The 'databases' directory contains all the databases relevant to the project. If imported into a database-management software the ORDER in which the files are uploaded MATTER GREATLY. Some DB-tables are derived from others. Therefore in order to avoid errors, the order of upload should be:

1) primary_tables.sql
2) sales.sql
3) populate_primary.sql
4) and finally the rest of the files

the 'php' directory contains all files that deal with server-side communication. These programs interact directly with the databases. The databases are accessed through a generic server name, username, password and database name. The generic information are as follows, This will ease the testing of the system, as all the php files contain these same exact informations:

$servername = "localhost";
$username = "oaxaca123";
$password = "Oaxaca123123$";
$db_name = "oaxacauk";


