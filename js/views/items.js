define([
  'marionette',
  'views/item'
], function (Marionette, ItemView) {
  
  return Marionette.CollectionView.extend({
    childView: ItemView,

    addChild: function(child, ChildView, index){
      if (child.get('status') === this.options.filterStatus) {
        Backbone.Marionette.CollectionView.prototype.addChild.apply(this, arguments);
      }
    }
  });

});
