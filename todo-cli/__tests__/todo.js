/* eslint-disable no-undef */
const todoList = require("../todo");
const {all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todolist test suite", () => {
    const formattedDate = (d) => { 
         return d.toISOString().split("T")[0]; 
        }; 
        const dateToday = new Date(); 
        const today = formattedDate(dateToday); 
        const yesterday = formattedDate( 
          new Date(new Date().setDate(dateToday.getDate() - 1)) 
        ); 
        const tomorrow = formattedDate( 
          new Date(new Date().setDate(dateToday.getDate() + 1)) 
        );
    

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
        add({ title: "test new todo.js", dueDate: yesterday, completed: false });
        expect(overdue().length).toBe(0);
    });

    test("checks retrieval of due today items", () => {
        expect(dueToday().length).toBe(1);
    });

    test("checks retrieval of due later items", () => {
        add({ title: " test new todo.js", dueDate: tomorrow, completed: false});
        expect(dueLater().length).toBe(0);
    });

});
