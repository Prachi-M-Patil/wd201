const express = require("express");
var csrf = require("tiny-csrf");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const app = express();
var cookieParser = require("cookie-parser");
const { Todo, User } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-unused-vars
const { request } = require("http");
// eslint-disable-next-line no-unused-vars
const { read } = require("fs");
const saltRounds = 10;
app.use(bodyParser.json());

// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
// Set EJS as view engine

app.use(flash());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secreat string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));
app.use(
  session({
    secret: "my-super-secret-key-215456454158721",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findOne({
        where: {
          email: username,
        },
      })
        .then(async (user) => {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid Password!" });
          }
        })
        .catch(() => {
          return done(null, false, {
            message: "Invalid User Credentials!",
          });
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user in session", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

app.get("/", async (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect("/todos");
  } else {
    response.render("index", {
      csrfToken: request.csrfToken(),
    });
  }
});

app.get("/signup", (request, response) => {
  response.render("signup", {
    csrfToken: request.csrfToken(),
  });
});

app.post("/users", async (request, response) => {
  if (request.body.firstName.length == 0) {
    request.flash("error", "Invalid First Name!");
    return response.redirect("/signup");
  }
  if (request.body.email.length == 0) {
    request.flash("error", "Invalid Email!");
    return response.redirect("/signup");
  }
  if (request.body.password.length < 8) {
    request.flash("error", "Password should at least contain 8 characters!");
    return response.redirect("/signup");
  }
  const existingUser = await User.findOne({
    where: { email: request.body.email },
  });
  if (existingUser) {
    request.flash("error", "User exists!");
    return response.redirect("/signup");
  }
  // Hash password using bcrypt
  const hashedPwd = await bcrypt.hash(request.body.password, saltRounds);
  console.log(hashedPwd);
  // Have to create the user here
  try {
    const user = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPwd,
    });
    request.login(user, (error) => {
      if (error) {
        console.log(error);
      }
      response.redirect("/todos");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (request, response) => {
  response.render("login", {
    csrfToken: request.csrfToken(),
  });
});

app.post(
  "/session",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (request, response) => {
    console.log(request.user);
    response.redirect("/todos");
  }
);

app.get("/signout", (request, response, next) => {
  // Signout
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect("/");
  });
});
// eslint-disable-next-line no-unused-vars
app.get(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const loggedInUserFirstName = request.user.firstName;
    const loggedInUser = request.user.id;
    const overdue = await Todo.getOverdueTodos(loggedInUser);
    const dueToday = await Todo.getDueTodayTodods(loggedInUser);
    const dueLater = await Todo.getDueLaterTodos(loggedInUser);
    const completedItems = await Todo.getCompletedItems(loggedInUser);
    if (request.accepts("html")) {
      response.render("todos", {
        loggedInUserFirstName,
        overdue,
        dueToday,
        dueLater,
        completedItems,
        csrfToken: request.csrfToken(),
      });
    } else {
      response.json({
        overdue,
        dueToday,
        dueLater,
        completedItems,
      });
    }
  }
);

app.post(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Creating a todo", request.body);
    console.log(request.user);
    if (request.body.title.length < 5) {
      request.flash("error", "title must be at least length 5!");
      return response.redirect("/todos");
    }
    if (request.body.dueDate.length == 0) {
      request.flash("error", "Invalid due Date!");
      return response.redirect("/todos");
    }
    // Todo
    try {
      await Todo.addTodo({
        title: request.body.title,
        dueDate: request.body.dueDate,
        userId: request.user.id,
      });
      return response.redirect("/todos");
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  }
);

app.put(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("We have to update a todo with ID:", request.params.id);
    const todo = await Todo.findByPk(request.params.id);
    //console.log(todo.dataValues.completed)
    // console.log(request.body)
    try {
      // const updatedTodo = await todo.markAsCompleted();
      const updatedTodo = await todo.setCompletionStatus(
        request.body.completed
      );
      return response.json(updatedTodo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  }
);

// eslint-disable-next-line no-unused-vars
app.delete(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Delete a todo by ID: ", request.params.id);
    try {
      await Todo.remove(request.params.id, request.user.id);
      return response.json({ success: true });
    } catch (error) {
      return response.status(422).json(error);
    }
  }
);

// app.listen(3000, () => {
//   console.log("started express server at port 3000");
// });
module.exports = app;
