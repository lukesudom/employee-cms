import { createConnection } from 'mysql2';


const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
});

export default db;