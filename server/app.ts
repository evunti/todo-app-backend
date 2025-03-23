import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
const PORT = 3001;

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement,
} = require("./utils");

// app.get("/", (req: Request, res: Response) => {
//   res.send("200:It Works");
// });

// app.get("/tasks", async (req: Request, res: Response) => {
//   const tasks = [
//     { id: 1, task: "Task 1" },
//     { id: 2, task: "Task 2" },
//   ];

//   res.json({ tasks });
// });

const tasks = [];
seedElements(tasks, "tasks");

app.get("/tasks", (req, res, next) => {
  res.send(tasks);
});
app.get("/tasks/:id", (req, res, next) => {
  const task = getElementById(req.params.id, tasks);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send();
  }
});

app.post("/tasks", (req, res, next) => {
  const receivedTask = createElement("tasks", req.query);
  if (receivedTask) {
    tasks.push(receivedTask);
    res.status(201).send(receivedTask);
  } else {
    res.status(400).send();
  }
});

app.put("/tasks/:id", (req, res, next) => {
  const taskIndex = getIndexById(req.params.id, tasks);
  if (taskIndex !== -1) {
    updateElement(req.params.id, req.query, tasks);
    res.send(tasks[taskIndex]);
  } else {
    res.status(404).send();
  }
});

// Delete a single animal
app.delete("/tasks/:id", (req, res, next) => {
  const taskIndex = getIndexById(req.params.id, tasks);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
