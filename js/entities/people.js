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
      var people = JSON.parse(localStorage.getItem('people'));
      
      if (people === null) {
        people = [];
        fetchFromSprintly();
      }
      
      this.add(people);

      function fetchFromSprintly() {
        var API_RESOURCE_PEOPLE = '/products/' + config.PRODUCT_ID + '/people.json';
        var url = config.API_BASE_URL + API_RESOURCE_PEOPLE;

        return $.ajax({
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
      }
  
    }

  });
});
