define([
  'marionette',
  'controllers/app',
  'routers/app',
  'modules/vent'
], function (Marionette, AppController, AppRouter, vent) {
 
  var app = new Marionette.Application();

  app.addInitializer(function(options){
    app.addRegions({
      'Content': '#content',
      'Modal':   '#modal'
    });

    var appController = new AppController({
      contentRegion: app.Content,
      modalRegion: app.Modal
    });

    var appRouter = new AppRouter({
      controller: appController
    });

    vent.on('data:fetch', function() {
      appController.fetchData();
    });

    vent.on('data:fetched', function() {
      appController.showDashboard();
      // appRouter.navigate('/dashboard');
    });

    vent.on('item:show', function(item) {
      appController.showItem(item);
      // appRouter.navigate('dashboard/' + item.get('number'));
    });

  });
  
  return app;
});
