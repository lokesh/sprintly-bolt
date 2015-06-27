define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.itemModal,

    ui: {
      'overlay': '.modal-overlay',
      'modal':   '.item-modal',
      'number':  '.item-number'
    },

    events: {
      'click @ui.number':  'onNumberClick',
      'click @ui.modal':   'onModalClick',
      'click @ui.overlay': 'onOverlayClick'
    },

    onBeforeShow: function() {
      // console.log('onBeforeShow');
    },

    onShow: function() {
      // console.log('onshow');
      // Get comments
      // products/{product_id}/items/{item_number}/comments.json
      
    },

    onNumberClick: function(event) {
      event.stopPropogation();
    },

    onModalClick: function(event) {
      event.stopPropogation();
    },

    onOverlayClick: function(event) {
      this.destroy();
    }


  });

});
