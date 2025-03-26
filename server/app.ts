import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

const PORT = 3001;

// const appRouter = express.Router();

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
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];
seedElements(tasks, "tasks");

const taskRouter = express.Router();

taskRouter.get("/:id", (req, res, next) => {
  const task = getElementById(req.params.id, tasks);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send();
  }
});

taskRouter.post("/", (req, res, next) => {
  const receivedTask: Task = createElement("tasks", req.query);
  if (receivedTask) {
    res.status(201).send(receivedTask);
  } else {
    res.status(400).send();
  }
});

taskRouter.put("/:id", (req, res, next) => {
  const taskIndex = getIndexById(req.params.id, tasks);
  if (taskIndex !== -1) {
    updateElement(req.params.id, req.query, tasks);
    res.send(tasks[taskIndex]);
  } else {
    res.status(404).send();
  }
});

taskRouter.delete("/:id", (req, res, next) => {
  const taskIndex = getIndexById(req.params.id, tasks);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.use("/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
