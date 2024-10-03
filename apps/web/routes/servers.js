const express = require("express");
const moment = require("moment");
const { Server, UserAction } = require("../../../models");
const serversRouter = express.Router();
const logAction = require("../logger/logger");

serversRouter.get("/", async (req, res) => {
  try {
    console.log("get servers");
    const servers = await Server.find({});
    res.json(servers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка при получении серверов" });
  }
});

serversRouter.get("/:id", async (req, res) => {
  try {
    console.log("get servers id ", req.params.id);
    const server = await Server.findById(req.params.id);
    if (!server) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    res.json(server);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка при получении сервера" });
  }
});

serversRouter.post("/", async (req, res) => {
  try {
    console.log("post servers");
    const server = new Server(req.body);
    const savedServer = await server.save();
    res.json(savedServer);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Ошибка при создании сервера" });
  }
});

serversRouter.post("/:id", async (req, res) => {
  try {
    console.log("post servers id ", req.params.id);
    const server = await Server.findById(req.params.id);
    if (!server) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    Object.assign(server, req.body);
    const updatedServer = await server.save();
    res.json(updatedServer);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Ошибка при обновлении сервера" });
  }
});

serversRouter.delete("/:id", async (req, res) => {
  try {
    console.log("delete servers id ", req.params.id);
    const result = await Server.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    res.send({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).send("");
  }
});

serversRouter.post("/:id/start", async (req, res) => {
  try {
    console.log("get start servers id ", req.params.id);
    const server = await Server.findById(req.params.id);
    if (!server) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    server.status = "started";
    await server.save();
    await logAction(req, res, "Пользователь запустил сервер");
    res.json(server);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка при запуске сервера" });
  }
});

serversRouter.post("/:id/stop", async (req, res) => {
  try {
    console.log("get stop servers id ", req.params.id);
    const server = await Server.findById(req.params.id);
    if (!server) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    server.status = "stopped";
    await server.save().then(res.json(server));
    await logAction(req, res, "Пользователь остановил сервер");
    res.json(server);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка при остановке сервера" });
  }
});

serversRouter.post("/:id/restart", async (req, res) => {
  try {
    console.log("get restart servers id ", req.params.id);
    const server = await Server.findById(req.params.id);
    if (!server) {
      return res.status(404).json({ message: "Сервер не найден" });
    }
    if (server.status !== "stopped") {
      server.status = "stopped";
      await server.save();
      console.log("Stopping server...");
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    server.status = "started";
    await server.save();
    await logAction(req, res, "Пользователь перезагрузил сервер");
    res.json(server);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка при перезагрузке сервера" });
  }
});

module.exports = {
  serversRouter,
};
