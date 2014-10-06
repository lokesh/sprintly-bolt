define([
  'marionette',
  'modules/templates'
], function (Marionette, templates) {
  
  return Marionette.ItemView.extend({
    template: templates.item,

    events: {
      'click .item': 'onClick'
    },

    onClick: function(event) {
      console.log(this.model.toJSON());
    }

  });

});
