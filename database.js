import mysql from 'mysql2';

const pool = mysql.createPool({
    host: procees.env.MYSQL_HOST,
    user: procees.env.MYSQL_USER,
    password: procees.env.MYSQL_PASSWORD,
    database: procees.env.MYSQL_DATABASE,
}).promise();

const getNotes = async () => {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows;
}

const notes = await getNotes();
console.log(notes);