define([
  'marionette',
  'entities/filters',
  'entities/items',
  'modules/templates',
  'modules/vent',
  'views/items_lists',
  'views/filters'
], function (Marionette, Filters, Items, templates, vent, ItemsListsView, FiltersView) {
  
  return Marionette.LayoutView.extend({
    template: templates.dashboard,

    regions: {
      'Main': '.dashboard-main',
      'Side': '.dashboard-side'
    },

    initialize: function() {
      this.items  = this.options.items;
      this.people = this.options.people;
      this.tags   = this.options.tags;
    },

    onRender: function() {
      var self = this;

      this.filters = new Filters();
      
      this.lunrIndex = this.items.createLunrIndex();
      
      this.filteredItems = new Items(this.items.toJSON());

      this.itemsListsView = new ItemsListsView({
        collection: this.filteredItems
      });

      this.filtersView = new FiltersView({
        model: this.filters,
        people: this.people,
        tags: this.tags
      });

      vent.on('filters:change', function(filters) {
        self.onFiltersChange(filters);
      });
    
      vent.on('app:resize', function() {
        self.setWidthOnItemsListsForScrolling();
      });
    },

    onShow: function() {
      this.Main.show(this.itemsListsView);
      this.Side.show(this.filtersView);

      this.setWidthOnItemsListsForScrolling();
    },

    setWidthOnItemsListsForScrolling: function() {
      var windowWidth = $(window).width();
      var leftOffset = this.$el.find('.dashboard-main').offset().left;
      this.$el.find('.dashboard-main').width(windowWidth - leftOffset);
    },

    onSearchChange: function() {

    },

    onFiltersChange: function(filters) {
      var people            = filters.get('people');
      var isPeopleFilterSet = (people.length > 0);
      
      var tags           = filters.get('tags');
      var tagsLength     = tags.length;
      var isTagsFilterSet = (tagsLength > 0);

      if (isPeopleFilterSet || isTagsFilterSet) {
        var filteredItemsArray = _.filter(this.items.toJSON(), function(item) {
          // Filters on Assignee
          if (isPeopleFilterSet) {
            if (item.assigned_to === null) {
              return false;
            }
            if ((people.indexOf(item.assigned_to.first_name + ' ' + item.assigned_to.last_name)) === -1){
              return false;
            }
          }
          
          // Filter on Tag. Use AND operation for multiple tags.
          if (isTagsFilterSet) {
            for (var i = 0; i < tagsLength; i++) {
              if (item.tags.indexOf(tags[i]) === -1) {
                return false;
              }
            }
          }
         return true;
        });
      } else {
        var filteredItemsArray = this.items.toJSON();
      }

      // Filters on Search
      var search = filters.get('search');
      if (search !== '' && search.length >= 3) {
        var results = this.lunrIndex.search(search);
        results = _.pluck(results,'ref');
        results = _.map(results, function(num) {
          return parseInt(num, 10);
        });
        filteredItemsArray = _.filter(filteredItemsArray, function(item) {
          return (results.indexOf(item.number) !== -1);
        })
      }

      this.filteredItems.reset(filteredItemsArray)
    }

  });

});
