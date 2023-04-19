//eslint disable no-undef
const todoList = () => {
  let all = []
  const add = (todoItem) => {
    all.push(todoItem)
  };
  const markAsComplete = (index) => {
    all[index].completed = true
  };

  const overdue = () => {
    const due = new Date();
    return all.filter((task) => task.dueDate < due.toLocaleDateString("en-CA"));
  
    // Write the date check condition here and return the array
    // of overdue items accordingly.
  };
  const dueToday = () => {
    const due = new Date();
    return all.filter((task) => task.dueDate == due.toLocaleDateString("en-CA"));
  
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
  };

  const dueLater = () => {
    const due = new Date();
    return all.filter((task) => task.dueDate > due.toLocaleDateString("en-CA"));
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    
  };
  const toDisplayableList = (list) => {
    return list
      .map(
        (todo) => `${todo.completed ? '[x]' : '[ ]'} ${todo.title} ${todo.dueDate === today ? '' : todo.dueDate}`,
      )
      .join('\n');
  };
    // Format the To-Do list here, and return the output string
    // as per the format given above.
  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
