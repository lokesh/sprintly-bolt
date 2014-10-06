define([
  'marionette',
  'modules/templates',
  'views/person_filter'
], function (Marionette, templates, PersonFilter) {
  
  return Marionette.CompositeView.extend({
    template: templates.peopleFilters,
    
    childView: PersonFilter,

    childViewContainer: '.filters-list',

    ui: {
      heading: '.filters-heading',
      list: '.filters-list'
    },

    events: {
      'click @ui.heading': 'onHeadingClick'
    },

    onHeadingClick: function(event) {
      this.ui.list.slideToggle();
    }
  });

});
