const { UserAction } = require("../../../models");
const moment = require("moment");

const logAction = async (req, res, action) => {
  try {
    await UserAction.create({
      serverId: req.params.id,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      user: "Тестовый пользователь",
      action: action,
    });
  } catch (err) {
    console.error("Ошибка при создании логов", err);
  }
};

module.exports = logAction;
