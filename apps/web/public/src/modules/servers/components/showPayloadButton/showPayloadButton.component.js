const showPayloadButton = {
  template: '<a class="btn btn-default" ng-click="$ctrl.showPayload()">' +
  '<span class="glyphicon glyphicon-cog"></span></a>',
  bindings: {
    payload: '<',
  },
  controller: ['$uibModal', function($uibModal) {
    this.showPayload = function() {
      $uibModal.open({
        component: 'showPayloadModal',
        size: 'lg',
        resolve: {
          payload: this.payload,
        },
      });
    };
  }],
};

export {showPayloadButton};
