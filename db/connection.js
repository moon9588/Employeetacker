const mysql = require('mysql2');

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mamona09',
    database: 'staffing',

},
    console.log('Connected to the staffing database.')
);