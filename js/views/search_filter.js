define([
  'underscore',
  'marionette',
  'modules/templates'
], function (_, Marionette, templates) {
  
  return Marionette.ItemView.extend({
    template: templates.searchFilter,

    ui: {
      input: '.search-filter-input'
    },
    
    events: {
      'keyup @ui.input': 'onKeyup'
    },
    
    onKeyup: _.debounce(function(event) {
      this.trigger('searchChange', this.ui.input.val());
    }, 250)

  });

});