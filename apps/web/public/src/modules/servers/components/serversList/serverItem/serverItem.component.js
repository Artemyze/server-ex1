import template from "./serverItem.template";
import "./serverItem.css";

const serverItem = {
  template: template(),
  controller: [
    "$scope",
    "Server",
    "NotificationService",
    function ($scope, Server, NotificationService) {
      this.server = $scope.$ctrl.server;
      this.start = function () {
        if (confirm("Вы хотите запустить сервер?")) {
          this.server.$start({ id: this.server._id }, function (response) {
            NotificationService.showSuccess("Сервер запущен");
          });
        }
      };

      this.stop = function () {
        if (confirm("Вы хотите остановить сервер?")) {
          this.server.$stop({ id: this.server._id }, function (response) {
            NotificationService.showSuccess("Сервер остановлен");
          });
        }
      };

      this.restart = function () {
        if (confirm("Вы хотите перезапустить сервер?")) {
          this.server.$restart({ id: this.server._id }, function (response) {
            NotificationService.showSuccess("Сервер перезапущен");
          });
        }
      };
    },
  ],
  bindings: {
    server: "<",
  },
};

export { serverItem };
