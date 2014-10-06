require.config({
  paths: {
    'backbone': '../bower_components/backbone/backbone',
    'jquery': '../bower_components/jquery/dist/jquery',
    'lunr': '../node_modules/lunr/lunr',
    'marionette' : '../bower_components/marionette/lib/backbone.marionette',
    'text': '../bower_components/text/text',
    'underscore': '../bower_components/underscore/underscore'
  }
});

require([
  'apps/app',
  'marionette'
], function(app, Marionette) {

  app.start();

  Backbone.history.start({
    pushState: false
  });

});
