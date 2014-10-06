define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.itemModal,

    ui: {
      'overlay': '.modal-overlay'
    },

    events: {
      'click @ui.overlay': 'onOverlayClick'
    },

    onOverlayClick: function(event) {
      this.destroy();
    }

  });

});
