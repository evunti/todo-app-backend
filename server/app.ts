import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("200:It Works");
});

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = [
    { id: 1, task: "Task 1" },
    { id: 2, task: "Task 2" },
  ];

  res.json({ tasks });
});
