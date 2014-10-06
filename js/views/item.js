define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.item,

    events: {
      'click .item': 'onClick'
    },

    onClick: function(event) {
      vent.trigger('item:show', this.model);
    }

  });

});
