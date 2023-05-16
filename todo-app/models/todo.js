"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
    }

    static addTodo({ title, dueDate }) {
      return this.create({
        title,
        dueDate,
        completed: false,
      });
    }

    setCompletionStatus(status) {
      return this.update({ completed: !status });
    }

    static async getTodos() {
      return await this.findAll();
    }

    static async getOverdueTodos() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toISOString().split("T")[0] },
          completed: false,
        },
      });
    }

    static async getDueTodayTodods() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toISOString().split("T")[0] },
          completed: false,
        },
      });
    }

    static async getDueLaterTodos() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toISOString().split("T")[0] },
          completed: false,
        },
      });
    }

    static async getCompletedItems() {
      return await Todo.findAll({
        where: {
          completed: true,
        },
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
