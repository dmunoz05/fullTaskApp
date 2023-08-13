NombreBD="task_fullStack"
NombreUser="u406195548_fullStack"
BDPassword="9cb+lov^S"


MYSQL_HOST = "89.117.7.204"
MYSQL_USER = "u406195548_fullStack"
MYSQL_PASSWORD = "9cb+lov^S"
MYSQL_DATABASE = "u406195548_task_fullStack"


CREATE DATABASE task_fullStack;

USE task_fullStack;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE task (
    id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Insert tow users into the users table 
INSERT INTO users (name, email, password) VALUES ('Beto', 'user1@example', 'password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user2@example', 'password2');


-- Insert task into the task table, associated with the first user
INSERT INTO task (title, user_id) 
VALUES 
("🏃Go for a morning run 🌄", 1),
("💻 Work on project presentation 👜" , 1),
("🛒 Go grocery shopping 🛍️", 1),
("📚 Read bike to the park 📖", 1),
("🚴 Read bike to the park 🌳", 1),
("🍽️ Cook dinner for family 👨‍👩‍👧‍👦", 1),
("🧑 Practice yoga 🧘‍♂️", 1),
("🎧 Listen to a podcast 🎤", 1),
("🧹 Clean the house 🫧", 1),
("🛌Get 8 hourse of sleep 💤", 1)


INSERT INTO task (title, user_id) 
VALUES 
("🏃Go for a morning run 🌄", 2),
("💻 Work on project presentation 👜" , 2),
("🛒 Go grocery shopping 🛍️", 2),
("📚 Read bike to the park 📖", 2),
("🚴 Read bike to the park 🌳", 2),
("🍽️ Cook dinner for family 👨‍👩‍👧‍👦", 2),
("🧑 Practice yoga 🧘‍♂️", 2),
("🎧 Listen to a podcast 🎤", 2),
("🧹 Clean the house 🫧", 2),
("🛌Get 8 hourse of sleep 💤", 2)


-- share task 1 of user 1 with user 2
INSERT INTO shared_task (task_id, user_id, shared_with_id)
VALUES (1, 1, 2);


-- Get task including shared task by id 
SELECT task.*, shared_task.shared_with_id  
FROM task 
LEFT JOIN shared_task ON task.id = shared_task.task_id  
WHERE task.user_id = [user_id] OR shared_task.shared_with_id = [user_id]

