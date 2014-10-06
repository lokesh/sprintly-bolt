define([
  'marionette',
  'modules/templates',
  'modules/vent'
], function (Marionette, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.personFilter,

    events: {
      'click .person-filter': 'onClick'
    },

    triggers: {
      'click .person-filter': 'click'
    },

    onClick: function(event) {
      this.$el.find('.filter-item').toggleClass('filter-item-on');
    }

  });

});
