define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.item,

    ui: {
      'item':   '.item',
      'number': '.item-number'
    },

    events: {
      'click @ui.item':   'onItemClick',
      'click @ui.number': 'onNumberClick',
    },

    onItemClick: function(event) {
      vent.trigger('item:show', this.model);
    },

    onNumberClick: function(event) {
      event.stopPropogation();
    }

  });

});
