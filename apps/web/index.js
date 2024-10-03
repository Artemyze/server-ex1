const express = require("express");
const config = require("config");
const path = require("path");
const favicon = require("serve-favicon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Server } = require("../../models");

const app = express();
app.use(express.json());

app.use(favicon(path.join(__dirname, "images", "favicon.ico")));

// Настройка шаблонизатора Pug
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

// Статик файлы
app.use("/static", express.static(path.join(__dirname, "../../node_modules")));
app.use("/public", express.static(path.join(__dirname, "/public")));

app.use(express.json({ limit: "2MB" }));

// Роутер
app.use(require("./routes"));


// Функция для создания моковых данных
const createMockServers = async () => {
  const mockServers = [
    {
      name: "Сервер 1",
      host: "192.168.1.1",
      username: "admin1",
      password: "password1",
      groupId: "group1",
      status: "stopped",
    },
    {
      name: "Сервер 2",
      host: "192.168.1.2",
      username: "admin2",
      password: "password2",
      groupId: "group2",
      status: "stopped",
    },
    {
      name: "Сервер 3",
      host: "192.168.1.3",
      username: "admin3",
      password: "password3",
      groupId: "group3",
      status: "stopped",
    },
  ];

  // Сначала удаляем все существующие серверы
  await Server.deleteMany({});

  // Добавляем моковые данные
  await Server.insertMany(mockServers);
  console.log("Моковые данные для серверов успешно созданы");
};

// Функция для инициализации MongoDB Memory Server
async function startMongoDB() {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017, // нужный порт для db
    },
  });
  const uri = mongoServer.getUri();
  console.log(uri);
  await mongoose.connect(uri);
  console.log("Подключение к временной MongoDB успешно");

  // Создание моковых данных
  await createMockServers();
}

// Запуск MongoDB и сервера Express
startMongoDB()
  .then(() => {
    app.listen(config.get("apps.web.port"), () => {
      console.log("Сервер запущен на порту", config.get("apps.web.port"));
    });
  })
  .catch((err) => {
    console.error("Ошибка при запуске MongoDB:", err);
  });
