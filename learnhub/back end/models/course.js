const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = require("./user");

const Course = sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
   
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Course, {
  foreignKey: "user_id",
});
Course.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

module.exports = Course;
