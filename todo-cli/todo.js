const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      let overdueCheck = []
      all.forEach((itm) => {
        if (itm.dueDate === yesterday && itm.completed === false){
          overdueCheck.push(itm);
        }
      })
      return overdueCheck.reverse();
      // Write the date check condition here and return the array
      // of overdue items accordingly.
    }
  
    const dueToday = () => {
      let dueTodayCheck = []
      all.forEach((itm) => {
        if (itm.dueDate === today) {
          dueTodayCheck.push(itm);
        }
      })
      return dueTodayCheck.reverse();
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
    }
  
    const dueLater = () => {
      let dueLaterCheck = []
      all.forEach((itm) => {
        if (itm.dueDate === tomorrow) {
          dueLaterCheck.push(itm);
        }
      })
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      return dueLaterCheck.reverse();
    }
  
    const toDisplayableList = (list) => {
      let outputarr = [];
      list.forEach((itm,index) => {
        if(itm.dueDate === yesterday)
        {
          if(itm.completed === true)
          {
            outputarr.push("[x]" + " " + itm.title + " " + itm.dueDate);
          } else {
            outputarr.push("[ ]" + " " + itm.title + " " + itm.dueDate);
          }
        }
        if (itm.dueDate === today) {
          delete itm.dueDate;
          if (itm.completed === true)
          {
            outputarr.push("[x]" + " " + itm.title);
          }
          else{
            outputarr.push("[ ]" + " " + itm.title);
          }
        }
        if(itm.dueDate === tomorrow) {
                outputarr.push("[ ]" + " " + itm.title + " " + itm.dueDate);
          }


        })
        outputarr.reverse();
        let val = outputarr.join("\n");
        return val;
      // Format the To-Do list here, and return the output string
      // as per the format given above.
    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
  const formattedDate = d => {
    return d.toISOString().split("T")[0]
  }
  
  var dateToday = new Date()
  const today = formattedDate(dateToday)
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  )
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  )
  
  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue")
  var overdues = todos.overdue()
  var formattedOverdues = todos.toDisplayableList(overdues)
  console.log(formattedOverdues)
  console.log("\n")
  
  console.log("Due Today")
  let itemsDueToday = todos.dueToday()
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
  console.log(formattedItemsDueToday)
  console.log("\n")
  
  console.log("Due Later")
  let itemsDueLater = todos.dueLater()
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
  console.log(formattedItemsDueLater)
  console.log("\n\n")
