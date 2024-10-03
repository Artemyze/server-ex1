import template from "./serversList.template";
import "./serversList.css";

const serversList = {
  template: template(),
  controller: [
    "Server",
    "Task",
    "NotificationService",
    function (Server, Task, NotificationService) {
      this.servers = Server.query();

      this.addTasks = function () {
        if (confirm("Вы хотите добавить задания?")) {
          Task.addRandom(function () {
            NotificationService.showSuccess("Задания добавлены");
          });
        }
      };
    },
  ],
};

export { serversList };
