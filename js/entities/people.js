define([
  'backbone',
  'entities/person',
  'modules/config',
], function (Backbone, Person, config) {
  
  return Backbone.Collection.extend({
    model: Person,

    comparator: function(person) {
      return person.get('first_name') + ' ' + person.get('last_name');  
    },

    // Overriding Backbone fetch()
    fetch: function(offset) {
      var peopleURL = '/products/' + config.PRODUCT_ID + '/people.json';
      var url       = config.API_BASE_URL + peopleURL;

      var request = $.ajax({
        type: 'GET',
        async: false,
        url: url,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.username + ':' + config.password));
        }
      })
      .done(function(data, status, xhr) {
        people = data;
        localStorage.setItem('people', JSON.stringify(people));
      })
      .fail(function(jqXHR, status, errorThrown) {
        console.warn('ERROR:' + errorThrown);
      });      

      this.add(people);

      return request;
    }

  });
});
