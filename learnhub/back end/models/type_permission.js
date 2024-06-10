const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const UserType = require("./user_type");
const Permission = require("./permission");

const TypePermission = sequelize.define(
  "type_permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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

UserType.hasMany(TypePermission, {
  foreignKey: "type_id",
});
TypePermission.belongsTo(UserType, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "type_id",
});

Permission.hasMany(TypePermission, {
  foreignKey: "permission_id",
});
TypePermission.belongsTo(Permission, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "permission_id",
});

module.exports = TypePermission;
