/* eslint-disable no-undef */
const todoList = require("../todo");
const {all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todolist test suite", () => {
    let dtToday = new Date();
    const today = dtToday.toLocaleDateString("en-CA");

    let yesterDay = new Date(new Date().setDate(dueToday.getDate() - 1));
    yesterDay = yesterDay.toLocaleDateString("en-CA");

    let dueltr = new Date(new Date().setDate(dueToday.getDate() - 1));
    dueltr = dueltr.toLocaleDateString("en-CA");

    test("creating new todo", () => {
        expect(all.length).toBe(0);
        add({ title: "test new todo.js", dueDate: today, completed: false });
        expect(all.length).toBe(1);
    });

    test("mark todo as complete", () => {
        markAsComplete(0);
        expect(all[0].completed).toBe(true);

    });

    test("checks retrieval of overdue items", () => {
        add({ title: "test new todo.js", dueDate: yesterDay, completed: false });
        expect(overdue().length).toBe(1);
    });

    test("checks retrieval of due today items", () => {
        expect(dueToday().length).toBe(2);
    });

    test("checks retrieval of due later items", () => {
        add({ title: " test new todo.js", dueDate: dueltr, completed: false});
        expect(dueLater().length).toBe(1);
    });

});
