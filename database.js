import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export const getNotes = async () => {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows;
};

export const getNote = async (id) => {
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
    return rows[0];
};

export const createNote = async (title, content) => {
    const [result] = await pool.query('INSERT INTO notes (title, contents) VALUES (?, ?)', [title, content]);
    const id = result.insertId;
    return getNote(id);
};

const notes = await getNotes();
const note = await getNote(2);
const newNote = await createNote('Brain New Note', 'This is another new note');
console.log(newNote);