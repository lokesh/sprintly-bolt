define([
  'backbone',
  'lunr',
  'entities/item',
  'modules/config'
], function (Backbone, lunr, Item, config) {
  
  return Backbone.Collection.extend({
    model: Item,

    // Overriding Backbone fetch()
    fetch: function(offset) {
      var request;
      var items = JSON.parse(localStorage.getItem('items'));
      
      if (items === null) {
        items = [];
        request = fetchFromSprintly();
      }
      
      this.add(items);

      function fetchFromSprintly(offset) {
        offset = _.isUndefined(offset) ? 0: offset;

        var itemsURL = '/products/' + config.PRODUCT_ID + '/items.json';
        var url      = config.API_BASE_URL + itemsURL;

        return $.ajax({
          type: 'GET',
          async: false,
          url: url,
          data: {
            'limit': config.API_ITEMS_PER_REQUEST_LIMIT,
            'offset': offset,
            'order_by': 'newest',
            // 'status': 'backlog, in-progress'
            'status': 'someday,backlog,in-progress,completed' // Not displaying ACCEPTED
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.username + ':' + config.password));
          }
        })
        .done(function(data, status, xhr) {

          items = items.concat(data);
          if (data.length === config.API_ITEMS_PER_REQUEST_LIMIT) {
            fetchFromSprintly(offset + config.API_ITEMS_PER_REQUEST_LIMIT);
          } else {
            localStorage.setItem('items', JSON.stringify(items));
          }

        })
        .fail(function(jqXHR, status, errorThrown) {
          console.warn('ERROR:' + errorThrown);
        });      
      }
    
      return request;
    },

    createLunrIndex: function() {
      var index = lunr(function () {
        this.ref('number');
        this.field('title', {boost: 10});
        this.field('description');
        // this.field('tags', {boost: 100});
      });

      this.each(function(item) {
        index.add({
          number: item.get('number'),
          title: item.get('title'),
          description: item.get('description'),
          // tags: item.get('tags')
        })
      });

      return index;  
    }

  });
});
