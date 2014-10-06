define([
  'marionette'
], function (
  Marionette
) {

  return Marionette.AppRouter.extend({
   
    // Methods for handling routing are in controller.js
    appRoutes: {
      'dashboard/:item': 'showItem',
      'dashboard': 'showDashboard',
      '*action':   'showLogin'
    }
  });
    
});
