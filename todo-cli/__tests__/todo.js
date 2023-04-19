/* eslint-disable no-undef */
// const todoList = require("../todo");

// const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

// describe("TodoList Test Suite", () => {
//   beforeAll(() => {
//     [
//       {
//         title: "Read book",
//         completed: false,
//         dueDate: new Date().toISOString().split("T")[0],
//       },
//       {
//         title: "Complete assignment",
//         completed: false,
//         dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
//           .toISOString()
//           .split("T")[0],
//       },
//       {
//         title: "Prepare for exams",
//         completed: false,
//         dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
//           .toISOString()
//           .split("T")[0],
//       },
//     ].forEach(add);
//   });
//   test("Should add new todo", () => {
//     const todoItemsCount = all.length;
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: new Date().toISOString().split("T")[0],
//     });
//     expect(all.length).toBe(todoItemsCount + 1);
//   });

//   test("Should mark a todo as complete", () => {
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true);
//   });

//   test("Should retrive the items with today's due date", () => {
//     const dueTodayTodoItemsCount = dueToday().length;
//     add({
//       title: "test due today",
//       completed: false,
//       dueDate: new Date().toISOString().split("T")[0],
//     });
//     expect(dueToday().length).toEqual(dueTodayTodoItemsCount + 1);
//   });

//   test("Should retrive the items with overdue due date", () => {
//     const overDueTodoItemsCount = overdue().length;
//     add({
//       title: "test overdue",
//       completed: false,
//       dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
//         .toISOString()
//         .split("T")[0],
//     });
//     expect(overdue().length).toEqual(overDueTodoItemsCount + 1);
//   });

//   test("Should retrive the items with due date having a later date", () => {
//     const dueLaterTodoItemsCount = dueLater().length;
//     add({
//       title: "test due later",
//       completed: false,
//       dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
//         .toISOString()
//         .split("T")[0],
//     });
//     expect(dueLater().length).toEqual(dueLaterTodoItemsCount + 1);
//   });
// });

const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
