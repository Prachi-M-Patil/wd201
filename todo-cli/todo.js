/* eslint-disable no-undef */

const today = new Date().toISOString().split("T")[0];

const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => item.dueDate < today);
   
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate === today);
    
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate > today);

  };

  const toDisplayableList = (list) => {
    const output = list
      .map((item) => {
        return (
          (item.completed ? "[x]" : "[ ]") +
          " " +
          item.title +
          (item.dueDate === new Date().toISOString().slice(0, 10)
            ? ""
            : " " + item.dueDate)
        ).trim();
      })
      .join("\n");
    return output;

    // Format the To-Do list here, and return the output string
    // as per the format given above.
  };

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

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

module.exports = todoList;
