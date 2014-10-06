define([
  'marionette',
  'entities/items',
  'entities/people',
  'entities/tags',  
  'modules/vent',
  'views/dashboard',
  'views/item',
  'views/login'
], function (Marionette, Items, People, Tags, vent, DashboardView, ItemView, LoginView) {
 
  return Marionette.Controller.extend({

    initialize: function(options) {
      this.Content = options.contentRegion;
    
      $(window).on('resize', this.onWindowResize);
    },

    showLogin: function() {
      var loginView = new LoginView();
      this.Content.show(loginView);
    },

    showDashboard: function() {
      var dashboardView = new DashboardView({
        'items':  this.items,
        'people': this.people,
        'tags':   this.tags
      });
      this.Content.show(dashboardView);
    },

    showItem: function(item) {
      console.log('showItem');
    },

    fetchData: function() {
      this.items = _.isUndefined(this.items) ? new Items(): this.items;
      this.items.fetch();

      this.people = _.isUndefined(this.people) ? new People(): this.people;
      this.people.fetch();

      this.tags = _.isUndefined(this.tags) ? new Tags(): this.tags;
      this.tags.fetch();

      vent.trigger('data:fetched');
    },

    onWindowResize: _.debounce(function(event) {
      vent.trigger('app:resize');
    }, 250)
 
  });

});
