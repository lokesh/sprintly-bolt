define([
  'marionette',
  'modules/templates',
  'views/tag_filter'
], function (Marionette, templates, TagFilter) {
  
  return Marionette.CompositeView.extend({
    template: templates.tagsFilters,
     
    childView: TagFilter,
     
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
