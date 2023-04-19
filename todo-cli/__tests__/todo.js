/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo Manager Test Suite", () => {
  var dateToday = new Date();
  const today = dateToday.toLocaleDateString("en-CA");
  let yesterday = new Date(new Date().setDate(dateToday.getDate() - 1));
  yesterday = yesterday.toLocaleDateString("en-CA");
  let tomorrow = new Date(new Date().setDate(dateToday.getDate() + 1));
  tomorrow = tomorrow.toLocaleDateString("en-CA");

  test("Add task", () => {
    expect(all.length).toBe(0);
    add({ title: "Learn node.js", dueDate: today, completed: false });
    expect(all.length).toBe(1);
  });

  test("Mark task as complete", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Get due today tasks", () => {
    expect(dueToday().length).toBe(1);
  });

  test("Get due later tasks", () => {
    add({ title: "Learn node.js", dueDate: tomorrow, completed: false });
    expect(dueLater().length).toBe(1);
  });

  test("Get overdue tasks", () => {
    add({ title: "Learn node.js", dueDate: yesterday, completed: false });
    expect(overdue().length).toBe(1);
  });
});
