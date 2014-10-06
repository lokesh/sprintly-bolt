// Note: This is a MODEL not a COLLECTION
define([
  'backbone'
], function (Backbone) {
  
  return Backbone.Model.extend({
    defaults: {
      'people': [],
      'search': '',
      'tags': []
    }
  });
});
