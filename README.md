# @vlodia/sqlite3

`@vlodia/sqlite3` is a TypeScript-based database management module that provides an easy-to-use interface for interacting with SQLite3 and MySQL databases. It includes all essential CRUD operations, table management, and connection handling.

## Installation

To install the module and the necessary dependencies, run the following commands:

```bash
npm install @vlodia/sqlite3
yarn add @vlodia/sqlite3
```
## Usage
```js
const { SQLiteHelper } = require('@vlodia/sqlite3');

const dbManager = new SQLiteHelper(); // Create a new instance of DatabaseManager
/////////////////////////////////SQLITE/////////////////////////////////
await dbManager.initSqlite3('./database.db'); // Initialize the SQLite3 database with the given path

await dbManager.executeSqlite3(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)' // SQL query to create a table if it doesn't exist
);

await dbManager.executeSqlite3(
    'INSERT INTO users (name, age) VALUES (?, ?)', // SQL query to insert data into the table
    ['Yahya', 19] // Parameters to be inserted into the query
);

const users = await dbManager.fetchSqlite3('SELECT * FROM users'); // Fetch all rows from the users table
console.log(users); // Output the fetched data

await dbManager.closeSqlite3(); // Close the SQLite3 database connection
/////////////////////////////////SQLITE/////////////////////////////////

/////////////////////////////////MYSQL//////////////////////////////////
await dbManager.initMysql({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db'
}); // Initialize MySQL with connection options

await dbManager.executeMysql(
    'CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY, name VARCHAR(255), price DECIMAL(10, 2))' // SQL query to create a table if it doesn't exist
);

await dbManager.executeMysql(
    'INSERT INTO products (id, name, price) VALUES (?, ?, ?)', // SQL query to insert data into the table
    [1, 'Laptop', 999.99] // Parameters to be inserted into the query
);

const products = await dbManager.fetchMysql('SELECT * FROM products'); // Fetch all rows from the products table
console.log(products); // Output the fetched data

await dbManager.closeMysql(); // Close the MySQL connection
/////////////////////////////////MYSQL//////////////////////////////////
```

## License
Ths project is licensed under the Apache-2.0, See [LICENSE](https://github.com/takachidot/vlodia-sqlite3/blob/main/LICENSE) file for more.