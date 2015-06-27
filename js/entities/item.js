define([
  'backbone',
  'modules/config'
], function (Backbone, config) {

  return Backbone.Model.extend({
    defaults: {
      children: [] // Populated prior to showing item modal
    },

    fetchChildren: function() {
      var self = this;
      if (this.get('type') !== 'story') {
        return;
      }

      var childrenURL = '/products/' + this.get('product').id + '/items/' + this.get('number') + '/children.json';
      var url = config.API_BASE_URL + childrenURL;

      return $.ajax({
        type: 'GET',
        async: false,
        url: url,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.username + ':' + config.password));
        }
      })
      .done(function(data, status, xhr) {
        self.set('children', data);
      })
      .fail(function(jqXHR, status, errorThrown) {
        console.warn('ERROR:' + errorThrown);
      });      
    }
  });
});
