"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
      }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title,
        dueDate,
        completed: false,
        userId,
      });
    }

    // markAsCompleted() {
    //   return this.update({ completed: true });
    // }

    setCompletionStatus(status, userId) {
      return this.update({ where: { userId }, completed: !status });
    }

    // static async getTodos() {
    //   return await this.findAll();
    // }

    static async getOverdueTodos(userId) {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toISOString().split("T")[0] },
          userId,
          completed: false,
        },
      });
    }

    static async getDueTodayTodods(userId) {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toISOString().split("T")[0] },
          userId,
          completed: false,
        },
      });
    }

    static async getDueLaterTodos(userId) {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toISOString().split("T")[0] },
          userId,
          completed: false,
        },
      });
    }

    static async getCompletedItems(userId) {
      return await Todo.findAll({
        where: {
          completed: true,
          userId,
        },
      });
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id,
          userId,
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
