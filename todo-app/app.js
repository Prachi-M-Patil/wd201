const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());



app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  const allTodos = await Todo.getTodos();
  const overdue = await Todo.getOverdueTodos();
  const dueToday = await Todo.getDueTodayTodods();
  const dueLater = await Todo.getDueLaterTodos();
  if (request.accepts("html")) {
    response.render("index", {
      allTodos,
      overdue,
      dueToday,
      dueLater,
    });
  } else {
    response.json({
      allTodos,
    });
  }
});

app.get("/todos", async (request, response) => {
  console.log("Todo list");
  try {
    const todoList = await Todo.getTodos();
    return response.json(todoList);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  // Todo
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by ID: ", request.params.id);
  const updatedTodo = await Todo.destroy({
    where: {
      id: request.params.id,
    },
  });
  return response.send(updatedTodo ? true : false);
});

module.exports = app;
