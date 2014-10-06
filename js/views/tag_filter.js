define([
  'marionette',
  'modules/templates'
], function (Marionette, templates) {
  
  return Marionette.ItemView.extend({
    template: templates.tagFilter,

    ui: {
      item: '.filter-item'
    },
    
    events: {
      'click @ui.item': 'onClick'
    },
    
    triggers: {
      'click @ui.item': 'click'
    },

    onClick: function(event) {
      this.ui.item.toggleClass('filter-item-on');
    }

  });

});