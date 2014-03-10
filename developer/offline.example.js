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

  $.mockjax( function (_settings) {
    if(/organizations/.test(_settings.url) && !_settings.data) {
      return {
        url: settings.urls.internal + '/organizations',
        data: null,
        proxy: dataLocation + '/organizations.json'
      };
    }
  });

  $.mockjax({
    url: settings.urls.internal + '/organizations',
    data: {
      customerId: "1567"
    },
    proxy: dataLocation + '/organization.customer.search.json'

  });

  $.mockjax({
    url: settings.urls.internal + '/organizations',
    data: {
      category: 'Provider,Availity'
    },
    proxy: dataLocation + '/organizations.json'
  });

  $.mockjax({
    url: /^.*\/subscriptions.*$/i,
    proxy: dataLocation + '/subscriptions.json'
  });

  $.mockjax({
    url: /^.*\/subscriptions.*$/i,
    proxy: dataLocation + '/subscriptions.json',
    type: 'post'

  });

  $.mockjax({
    url: settings.urls.internal + '/organizations',
    data: null,
    proxy: dataLocation + '/organizations.json'
  });

  $.mockjax({
    url: settings.urls.internal + '/era-routings',
    proxy: dataLocation + '/era-routings.json',
    type: 'post'

  });

  $.mockjax({
    url: settings.urls.internal + '/users/me',
    proxy: dataLocation + '/me.json'

  });

  $.mockjax({
    url: /^.*\/payers.*$/i,
    data: {
      transactionType: "835"
    },
    proxy: dataLocation + '/payers.835.json'
  });

  $.mockjax({
    url: /^.*\/payers.*$/i,
    data: {
      transactionType: "EFT"
    },
    proxy: dataLocation + '/payers.eft.json'
  });

  $.mockjax({
    url: /^.*\/providers.*$/i,
    responseTime: 300,
    proxy: dataLocation + '/providers.json'
  });

  $.mockjax({
    url: '/api/v1/encounters',
    proxy: dataLocation + '/encounters.json'
  });

  $.mockjax({
    url: settings.urls.internal + '/permissions?limit=1000',
    responseTime: 1000,
    proxy: dataLocation + '/permissions.json'
  });

  $.mockjax({
    url: settings.urls.internal + '/search',
    responseTime: 1000,
    data: {
      npi: 1234567893
    },
    proxy: dataLocation + '/npi.search.organizations.json'
  });

  $.mockjax({
    url: settings.urls.internal + '/search',
    responseTime: 1000,
    data: {
      npi: 2345678900
    },
    proxy: dataLocation + '/npi.search.providers.json'
  });

  $.mockjax({
    url: settings.urls.internal + "/era-routing-applications",
    type: 'POST',
    responseTime: 1000,
    response: function(data) {
      var response = {
        metadata: {},
        eRARoutingApplication: JSON.parse(data.data)
      };

      response.eRARoutingApplication.id = "TEST ID";
      response.eRARoutingApplication.deliveredToOrganization.primaryAccessAdministrator = {
        firstName: "PAA FIRST",
        lastName: "PAA LAST",
        emailAddress: "PAA@EMAIL.COM"
      };
      response.eRARoutingApplication.deliveredToOrganization.primaryControllingAuthority = {
        firstName: "PCA FIRST",
        lastName: "PCA LAST",
        emailAddress: "PCA@EMAIL.COM"
      };
      this.responseText = JSON.stringify(response);
    }
  });

  $.mockjax({
    url: /^.*\/restore-requests.*$/,
    type: 'GET',
    responseTime: 1000,
    response: function(data) {
      data = data.data;
      var response = {
        metadata: {}
      };
      if (!data.zip) {
        response.restoreRequests = {
          "fileCount": 3,
          "fileNames": ["File 1", "File 2", "File 3"],
          "message": "Wed Jul 31 13:58:12 2013 - restore completed"
        };
      } else {
        response.restoreRequests = {
          "fileCount": 3,
          "fileNames": [
            "EBT-Affinity_M-201307262115-002.ebt",
            "EBT-HUMANA6110-201307262215-002.ebt",
            "IBT-201307262115-001.ibt"
          ],
          "zipFile": "RestoredFiles-20130704-20130802-835-DPT-EBT-IBT.zip",
          "message": "Fri Aug  2 10:23:39 2013 - restore completed"
        };
      }
      this.responseText = JSON.stringify(response);
    }
  });

  /*
  $.ajaxSetup({
    beforeSend: function() {
      this.urls = window.location.origin + window.location.pathname.replace(/\/$/, '') + this.url;
    }
  });
  */

  return settings;

});
