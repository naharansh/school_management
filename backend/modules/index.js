const sequelize = require("../config/db");
const Role = require("./roles")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);



Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "RESTRICT",
});


User.belongsTo(Role, {
  foreignKey: "role_id",
});

module.exports = {
  sequelize,
  Role,
  User,
};