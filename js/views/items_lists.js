define([
  'marionette',
  'modules/templates',
  'modules/vent',
  'views/items',
  'views/items_statusbar'
], function (Marionette, templates, vent, ItemsView, ItemsStatusbarView) {
  
  return Marionette.LayoutView.extend({
    template: templates.itemsLists,

    regions: {
      'Statusbar': '.items-statusbar',
      'SomedayList': '.items-someday-list',
      'BacklogList': '.items-backlog-list',
      'InprogressList': '.items-inprogress-list',
      'CompletedList': '.items-completed-list',
      'AcceptedList': '.items-accepted-list'
    },

    onRender: function() {
      var self = this;

      this.itemsStatusbarView = new ItemsStatusbarView({
        collection: this.collection
      });

      this.somedayItemsView = new ItemsView({
        collection: this.collection,
        filterStatus: 'someday'
      });
      this.backlogItemsView = new ItemsView({
        collection: this.collection,
        filterStatus: 'backlog'
      });
      this.inprogressItemsView = new ItemsView({
        collection: this.collection,
        filterStatus: 'in-progress'
      });
      this.completedItemsView = new ItemsView({
        collection: this.collection,
        filterStatus: 'completed'
      });
      this.acceptedItemsView = new ItemsView({
        collection: this.collection,
        filterStatus: 'accepted'
      });

      vent.on('app:resize', function() {
        self.setHeightsOnListForScrolling();
      });
    },

    onShow: function() {
      this.Statusbar.show(this.itemsStatusbarView);
      this.SomedayList.show(this.somedayItemsView);
      this.BacklogList.show(this.backlogItemsView);
      this.InprogressList.show(this.inprogressItemsView);
      this.CompletedList.show(this.completedItemsView);
      // this.AcceptedList.show(this.acceptedItemsView);

      this.setHeightsOnListForScrolling();
    },

    setHeightsOnListForScrolling: function() {
      var windowHeight = $(window).height();
      var topOffset = this.$el.find('.items-list:first').offset().top;
      this.$el.find('.items-list').height(windowHeight - topOffset);
    }

  });
});
