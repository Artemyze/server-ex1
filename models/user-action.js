const mongoose = require("mongoose");

const userActionSchema = new mongoose.Schema({
  date: String,
  serverId: String,
  user: String,
  action: String,
});

userActionSchema.index({
  serverId: 1,
  date: -1,
});

// Создаем модель на основе схемы
const UserAction = mongoose.model("UserAction", userActionSchema);

// Экспортируем и схему, и модель
module.exports = {
  userActionSchema,
  UserAction,
};
