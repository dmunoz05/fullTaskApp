import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.
    createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();


export async function getTask(id) {
    const [rows] = await pool.query(`SELECT * FROM task WHERE id = ?`, [id]);
    return rows[0];
}

export async function getTaskByID(id) {
    const [rows] = await pool.query(
        `
      SELECT task.*, shared_task.shared_with_id
      FROM task
      LEFT JOIN shared_task ON task.id = shared_task.task_id
      WHERE task.user_id = ? OR shared_task.shared_with_id = ?
    `,
        [id, id]
    );
    return rows;
}

export async function getSharedTaskByID(id) {
    const [rows] = await pool.query(
        `SELECT * FROM shared_task WHERE task_id = ?`,
        [id]
    );
    return rows[0];
}

export async function getUserByID(id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
}

export async function getUserByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
        email,
    ]);
    return rows[0];
}

export async function createTask(user_id, title) {
    const [result] = await pool.query(
        `
      INSERT INTO task (user_id, title)
      VALUES (?, ?)
    `,
        [user_id, title]
    );
    const taskID = result.insertId;
    return getTask(taskID);
}

export async function deleteTask(id) {
    const [result] = await pool.query(
        `
      DELETE FROM task WHERE id = ?;
      `,
        [id]
    );
    return result;
}

export async function toggleCompleted(id, value) {
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(
        `
      UPDATE task
      SET completed = ${newValue} 
      WHERE id = ?;
      `,
        [id]
    );
    return result;
}

export async function shareTas(task_id, user_id, shared_with_id) {
    const [result] = await pool.query(
        `
      INSERT INTO shared_task (task_id, user_id, shared_with_id) 
      VALUES (?, ?, ?);
      `,
        [task_id, user_id, shared_with_id]
    );
    return result.insertId;
}



getUserByID(1);

// let host = process.env.MYSQL_HOST;
// let port = process.env.MYSQL_PORT;
// let user = process.env.MYSQL_USER;
// let password = process.env.MYSQL_PASSWORD;
// let nameBd = process.env.MYSQL_DATABASE;

// console.log('HOST: ' + host);
// console.log('PORT: ' + port);
// console.log('USER: ' + user);
// console.log('PASSWORD: ' + password);
// console.log('BD: ' + nameBd); 
