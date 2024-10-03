import template from './showPayloadModal.template';

const showPayloadModal ={
  template: template(),
  bindings: {
    close: '&',
    resolve: '<',
  },
  controller: [
    function() {
      this.$onInit = function() {
        this.payload = JSON.stringify(this.resolve.payload, null, '  ');
      };
    },
  ],
};

export {showPayloadModal};
