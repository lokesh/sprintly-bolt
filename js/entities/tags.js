define([
  'backbone',
  'entities/tag',
  'modules/config',
], function (Backbone, Tag, config) {
  
  return Backbone.Collection.extend({
    model: Tag,    

    comparator: 'tag',

    // Overriding Backbone fetch()
    fetch: function(offset) {
      var tagsURL = '/products/' + config.PRODUCT_ID + '/tags.json';
      var url     = config.API_BASE_URL + tagsURL;

      var request = $.ajax({
        type: 'GET',
        async: false,
        url: url,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.username + ':' + config.password));
        }
      })
      .done(function(data, status, xhr) {
        tags = data;
        localStorage.setItem('tags', JSON.stringify(tags));
      })
      .fail(function(jqXHR, status, errorThrown) {
        console.warn('ERROR:' + errorThrown);
      });      

      this.add(tags);

      return request;
    }

  });
});
