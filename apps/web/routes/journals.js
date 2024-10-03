const express = require("express");
const moment = require("moment");
const { UserAction } = require("../../../models");
const journalsRouter = express.Router();

function findColumnFilter(columns, columnName) {
  const column = columns.find((column) => column.data === columnName);
  if (column) {
    return column.search.value;
  }
}

journalsRouter.get("/user-actions/:serverId", async (req, res) => {
  const query = {
    serverId: req.params.serverId,
  };
  try {
    console.log("Запрос к базе данных...");
    console.log(query);
    const limit = parseInt(req.query.length || 10);
    const skip = parseInt(req.query.start || 0);
    console.log(`Лимит: ${limit}, Смещение: ${skip}`);
    const userActions = await UserAction.find(query).limit(limit).skip(skip);
    console.log("Данные получены из базы данных...");
    console.log(userActions);
    const count = await UserAction.countDocuments(query);
    console.log(`Количество документов: ${count}`);
    res.json({
      draw: parseInt(req.query.draw),
      recordsTotal: count,
      recordsFiltered: count,
      data: userActions,
    });
    console.log("Ответ отправлен...");
  } catch (err) {
    console.log(err);
    res.status(500).send("");
  }
});

module.exports = {
  journalsRouter,
};
