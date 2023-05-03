const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const allTodos = await Todo.getTodos();
  if (request.accepts("html")) {
    response.render("index", {
      allTodos,
    });
  } else {
    response.json({
      allTodos,
    });
  }
});

// app.get(
//   "/todos",
//   connectEnsureLogin.ensureLoggedIn(),
//   async (request, response) => {
//     const userId = request.user.id;
//     const overdueTodos = await Todo.overdue(userId);
//     const dueTodayTodos = await Todo.dueToday(userId);
//     const dueLaterTodos = await Todo.dueLater(userId);
//     const completedTodos = await Todo.completed(userId);
//     if (request.accepts("html")) {
//       response.render("todos", {
//         overdueTodos,
//         dueTodayTodos,
//         dueLaterTodos,
//         completedTodos,
//         user: request.user,
//         csrfToken: request.csrfToken(),
//       });
//     } else {
//       response.json({
//         overdueTodos,
//         dueTodayTodos,
//         dueLaterTodos,
//         completedTodos,
//       });
//     }
//   }
// );

// app.get("/signup", (request, response) => {
//   response.render("signup", {
//     csrfToken: request.csrfToken(),
//     title: "Signup",
//   });
// });

// app.get("/login", (request, response) => {
//   response.render("login", { csrfToken: request.csrfToken(), title: "Login" });
// });

// app.post(
//   "/session",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   (request, response) => {
//     response.redirect("/todos");
//   }
// );

// app.get("/signout", (request, response) => {
//   request.logout((err) => {
//     if (err) {
//       /* eslint-disable no-undef */
//       return next(err);
//     }
//     response.redirect("/");
//   });
// });

// app.post("/users", async (request, response) => {
//   const { firstName, lastName, email, password } = request.body;

//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   try {
//     const user = await User.createUser({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });
//     request.logIn(user, (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       response.redirect("/todos");
//     });
//   } catch (error) {
//     error.errors.forEach((element) => {
//       request.flash("error", element.message);
//     });
//     response.redirect("signup");
//   }
// });


// app.get(
//   "/alltodos",
//   connectEnsureLogin.ensureLoggedIn(),
//   async function (request, response) {
//     try {
//       const todos = await Todo.getTodos(request.user.id);
//       return response.json(todos);
//     } catch (error) {
//       return response.status(500).send(error);
//     }
//   }
// );

app.get(
  "/todos",
  async function (request, response) {
    console.log("Todo list");
    try {
      const todoList = await Todo.getTodos();
      return response.json(todoList);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  }
);

app.post(
  "/todos",
  async (request, response) => {
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
  }
);

app.put(
  "/todos/:id/markAsCompleted",
  async function (request, response) {
    console.log("We have to update a todo with ID:", request.params.id);
    const todo = await Todo.findByPk(request.params.id);
    try {
      const updatedTodo = await todo.markAsCompleted();
      return response.json(updatedTodo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  }
);

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
