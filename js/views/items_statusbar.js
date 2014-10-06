define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.itemsStatusbar,
    
    collectionEvents: {
      'reset': 'render'
    },

    serializeData: function() {
      return {
        'count': this.collection.length
      }
    }
  });

});
