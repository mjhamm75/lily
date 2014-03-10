/*global console:true*/
define(function(require) {

  "use strict";

  var $ = require('jquery');
  require('jqueryMockAjax');

  "use strict";

  var dataLocation = '../../../developer/data';

  var settings = {
    "urls": {
      "external": "/public/api/v1",
      "internal": "/v1"
    }
  };

  $.mockjaxSettings = {
    status:        200,
    responseTime:  0,
    dataType: 'json',
    isTimeout:     false,
    contentType:   'text/json',
    logging: false,
    log: function( mockHandler, requestSettings ) {
      if( mockHandler.logging === false || ( typeof mockHandler.logging === 'undefined' && $.mockjaxSettings.logging === false ) ) {
        return;
      }
      if(window.console && console.log) {
        var message = 'MOCK ' + requestSettings.type.toUpperCase() + ': ' + requestSettings.url;
        var request = $.extend({}, requestSettings);
        if (typeof console.log === 'function') {
          console.log(message, request);
        } else {
          try {
            console.log( message + ' ' + JSON.stringify(request) );
          } catch (e) {
            console.log(message);
          }
        }
      }
    }
  };

  return settings;

});
