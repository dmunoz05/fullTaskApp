import express from 'express';
import cors from 'cors';
import {
    getTask,
    getTaskByID,
    getSharedTaskByID,
    getUserByID,
    getUserByEmail,
    createTask,
    deleteTask,
    toggleCompleted,
    shareTas
} from './database.js';

const corsOptions = {
    origin: "*", 
    methods: ["POST", "GET"],
    credentials: true,
};

// const corsOptions = {
//     origin: "http://127.0.0.1:5173", 
//     methods: ["POST", "GET"],
//     credentials: true,
// };

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/task/:id", async (req, res) => {
    const task = await getTaskByID(req.params.id);
    res.status(200).send(task);
});

app.get("/task/shared_task/:id", async (req, res) => {
    const task = await getSharedTaskByID(req.params.id);
    const author = await getUserByID(task.user_id);
    const shared_with = await getUserByID(task.shared_with_id);
    res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
});

app.put("/task/:id", async (req, res) => {
    const { value } = req.body;
    const task = await toggleCompleted(req.params.id, value);
    res.status(200).send(task);
});

app.delete("/task/:id", async (req, res) => {
    await deleteTask(req.params.id);
    res.send({ message: "Task deleted successfully" });
});

app.post("/task/shared_task", async (req, res) => {
    const { task_id, user_id, email } = req.body;
    const userToShare = await getUserByEmail(email);
    const sharedTask = await shareTask(task_id, user_id, userToShare.id);
    res.status(201).send(sharedTask);
});

app.post("/task", async (req, res) => {
    const { user_id, title } = req.body;
    const task = await createTask(user_id, title);
    res.status(201).send(task);
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
