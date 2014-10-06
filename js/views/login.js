define([
  'marionette',
  'modules/config',
  'modules/templates',
  'modules/vent'
], function (Marionette, config, templates, vent) {
  
  return Marionette.ItemView.extend({
    template: templates.login,

    ui: {
      'username': '.login-input-username',
      'password': '.login-input-password',
      'start':    '.login-button-start'
    },

    events: {
      'keyup @ui.username': 'onInputKeyup',
      'keyup @ui.password': 'onInputKeyup',
      'click @ui.start':    'onStartClick'
    },

    onInputKeyup: function(event) {
      this.ui.start.prop('disabled', (
        (this.ui.username.val().length <= 0) || 
         this.ui.password.val().length <= 0));
    },

    onStartClick: function(event) {
      config.username = this.ui.username.val();
      config.password = this.ui.password.val();
      vent.trigger('data:fetch');
    }

  });

});
