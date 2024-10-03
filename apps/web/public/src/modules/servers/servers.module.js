import { serversList } from "./components/serversList/serversList.component";
import { serversEdit } from "./components/serversEdit/serversEdit.component";
import { serversView } from "./components/serversView/serversView.component";
import { serverUserActionTable } from "./directives/serverUserActionTable.directive";
import { serverTasksTable } from "./directives/serverTasksTable.directive";
import { tasksChart } from "./components/taskChart/tasksChart.component";
import { showPayloadModal } from "./components/showPayloadModal/showPayloadModal.component";
import { showPayloadButton } from "./components/showPayloadButton/showPayloadButton.component";
import { serverItem } from "./components/serversList/serverItem/serverItem.component";

export const serversModule = angular
  .module("servers", [])
  .component("serversList", serversList)
  .component("serverItem", serverItem)
  .component("serversEdit", serversEdit)
  .component("serversView", serversView)
  .directive("serverUserActionTable", serverUserActionTable)
  .directive("serverTasksTable", serverTasksTable)
  .component("tasksChart", tasksChart)
  .component("showPayloadModal", showPayloadModal)
  .component("showPayloadButton", showPayloadButton);
