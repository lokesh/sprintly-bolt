define([
  'marionette',
  'entities/items',
  'entities/people',
  'entities/tags',  
  'modules/vent',
  'views/dashboard',
  'views/item',
  'views/item_modal',
  'views/login'
], function (Marionette, Items, People, Tags, vent, DashboardView, 
  ItemView, ItemModalView, LoginView) {
 
  return Marionette.Controller.extend({

    initialize: function(options) {
      this.Content = options.contentRegion;
      this.Modal   = options.modalRegion;

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
      var itemModalView = new ItemModalView({
        model: item
      });
      this.Modal.show(itemModalView);
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
