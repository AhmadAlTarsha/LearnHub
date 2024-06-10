const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const UserType = require("./user_type");


const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
   

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },

  

    user_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        msg: "this phone in use",
      },
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

UserType.hasMany(User, {
  foreignKey: "user_type_id",
});
User.belongsTo(UserType, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "user_type_id",
});



module.exports = User;
