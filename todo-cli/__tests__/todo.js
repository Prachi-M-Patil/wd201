/* eslint-disable no-undef */
/*const todoList = require("../todo");
const {all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todolist test suite", () => {
    var dateToday = new Date();
    const today = dateToday.toLocaleDateString("en-CA");
    let yesterday = new Date(new Date().setDate(dateToday.getDate() - 1));
    yesterday = yesterday.toLocaleDateString("en-CA");
    let tomorrow = new Date(new Date().setDate(dateToday.getDate() + 1));
    tomorrow = tomorrow.toLocaleDateString("en-CA");
    

    test("creating new todo", () => {
        expect(all.length).toBe(0);
        add({ title: "test new todo.js", dueDate: today, completed: false });
        expect(all.length).toBe(1);
    });

    test("mark todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);

    });

    test("checks retrieval of overdue items", () => {
        add({ title: "test new todo.js", dueDate: yesterday, completed: false });
        expect(overdue().length).toBe(1);
    });

    test("checks retrieval of due today items", () => {
        expect(dueToday().length).toBe(1);
    });

    test("checks retrieval of due later items", () => {
        add({ title: " test new todo.js", dueDate: tomorrow, completed: false});
        expect(dueLater().length).toBe(1);
    });

});
*/
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
