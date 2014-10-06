define([
  'marionette',
  'modules/config',
  'modules/templates',
  'modules/vent',
  'views/people_filters',
  'views/search_filter',
  'views/tags_filters'
], function (Marionette, config, templates, vent, PeopleFiltersView, SearchFilterView,
             TagsFiltersView) {
  
  return Marionette.LayoutView.extend({
    template: templates.filters,

    regions: {
      'Section1': '.filters-section-1',
      'Section2': '.filters-section-2',
      'Section3': '.filters-section-3',
      'Section4': '.filters-section-4'
    },

    modelEvents: {
      'change': 'onFiltersChange'
    },

    initialize: function(){
      this.people = this.options.people;
      this.tags   = this.options.tags;
    },

    onRender: function() {
      var self = this;

      this.searchFilterView = new SearchFilterView({
        model: this.model
      });
      this.peopleFiltersView = new PeopleFiltersView({
        collection: this.people
      });
      this.tagsFiltersView = new TagsFiltersView({
        collection: this.tags
      });

      this.searchFilterView.on('searchChange', function(data) {
        self.model.set('search', data);
      });      
      this.peopleFiltersView.on('childview:click', function(child, data) {
        self.onPersonFilterClick(data);
      });
      this.tagsFiltersView.on('childview:click', function(child, data) {
        self.onTagFilterClick(data);
      });      
    },

    onShow: function() {
      this.Section1.show(this.searchFilterView);
      this.Section2.show(this.peopleFiltersView);
      this.Section3.show(this.tagsFiltersView);
    },

    onPersonFilterClick: function(data) {
      var people = _.clone(this.model.get('people'));
      var name   = data.model.get('first_name') + ' ' + data.model.get('last_name');
      
      var index = people.indexOf(name);
      if (index === -1) {
        people.push(name);
      } else {
        people.splice(index, 1);
      }
      this.model.set('people', people);
    },

    onTagFilterClick: function(data) {
      var tags = _.clone(this.model.get('tags'));
      var tag  = data.model.get('tag');
      
      var index = tags.indexOf(tag);
      if (index === -1) {
        tags.push(tag);
      } else {
        tags.splice(index, 1);
      }
      this.model.set('tags', tags);
    },

    onFiltersChange: function(filters) {
      vent.trigger('filters:change', filters);
    }
  
  });

});
