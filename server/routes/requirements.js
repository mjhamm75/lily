/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var async = require('async');
var _ = require('underscore');

var ScoutRequirement = Bookshelf.Model.extend({
  tableName: 'scout_requirements',
  idAttribute: null
});

var ScoutRequirements = Bookshelf.Collection.extend({
  model: ScoutRequirement
});

var AdvancementRequirement = Bookshelf.Model.extend({
  tableName: 'advancement_requirements',
  idAttribute: null
});

var AdvancementRequirements = Bookshelf.Collection.extend({
  model: AdvancementRequirement
});

var updateScoutRequirement = function(reqId, scoutId, callback) {
  'use strict';
  var scoutReq = new ScoutRequirement({
      requirement_id: reqId,
      scout_id: scoutId,
      initials: 'mjh',
      completed_date: '2014-04-10'
    });
    scoutReq.save().then(function(data) {
      callback(data.toJSON());
    });
};

var deleteScoutRequirement = function(reqId, scoutId, callback) {
  'use strict';
  Bookshelf.knex('scout_requirements')
      .where('scout_id', scoutId)
      .where('requirement_id', reqId)
      .del().then(function() {
        callback({
          requirement_id: reqId,
          completed_date: null,
          initials: null
        });
      });
};

var toggleScoutRequirement = function(scoutId, scoutRequirement, advancementRequirement, callback) {
  'use strict';
  if(scoutRequirement === undefined) {
    updateScoutRequirement(advancementRequirement.requirement_id, scoutId, function(data) {
      callback(data);
    });
  } else {
    var id = advancementRequirement.requirement_id;
    deleteScoutRequirement(id, scoutId, function(data) {
      callback(data);
    });
  }
};

var getScoutRequirements = function(scoutId, callback) {
  'use strict';
  var scoutRequirements = new ScoutRequirements();
  scoutRequirements.query({
    where: {
      scout_id: scoutId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
};

var getAdvancementRequirements = function(advancementId, callback) {
  'use strict';
  var advancementRequirements = new AdvancementRequirements();
  advancementRequirements.query({
    where: {
      advancement_id: advancementId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
};

var getChildrenComplete = function(scoutId, children, callback) {
  'use strict';
  getScoutRequirements(scoutId, function(scoutReqs) {
    var count = 0;
    async.each(children, function(child, callback) {
      var req = _.findWhere(scoutReqs.toJSON(), { requirement_id: child});
      if(req && req.completed_date) {
        count = count + 1;
      }
      callback();
    }, function(err) {
      if(!err) {
        callback(count);
      }
    });
  });
};

// var isSingle = function(req) {
//   'use strict';
//   return _.isNull(req.parent) && _.isNull(req.children);
// };

var isParent = function(req) {
  'use strict';
  return !_.isNull(req.children);
};

var isChild = function(req) {
  'use strict';
  return !_.isNull(req.parent);
};

var toggleCurrentRequirement = function(scoutId, reqId, scoutReqs, advancementReqs, callback) {
  'use strict';
  var id = parseInt(reqId);
  var advancementReq = _.findWhere(advancementReqs, {requirement_id: id});
  var scoutReq = _.findWhere(scoutReqs, {requirement_id: id});
  if(!isParent(advancementReq)) {
    toggleScoutRequirement(scoutId, scoutReq, advancementReq, function(data) {
      callback(data);
    });
  }
};

var toggleCurrentParent = function(scoutId, reqId, scoutReqs, advancementReqs, callback) {
  'use strict';
  var current_id = parseInt(reqId);
  var advancementReq = _.findWhere(advancementReqs, {requirement_id: current_id});
  if(isChild(advancementReq)) {
    var parent_id = parseInt(advancementReq.parent);
    var parentReq = _.findWhere(advancementReqs, {requirement_id: parent_id });
    var children_needed = parentReq.children_needed;
    getChildrenComplete(scoutId, parentReq.children, function(children_complete) {
      if(children_needed === children_complete) {
        updateScoutRequirement(parentReq.requirement_id, scoutId, function(data) {
          callback(data);
        });
      } else {
        var id = parentReq.requirement_id;
        deleteScoutRequirement(id, scoutId, function(data) {
          callback(data);
        });
      }
    });
  } else {
    callback();
  }
};

exports.toggleRequirement = function(req, res) {
  'use strict';
  async.parallel({
    scoutRequirements: function(callback) {
      getScoutRequirements(req.body.scoutId, function(data) {
        callback(null, data);
      });
    },
    advancementRequirements: function(callback){
      getAdvancementRequirements(req.body.advancementId, function(data) {
        callback(null, data);
      });
    }
  }, function(err, result) {
    async.series({
      currentReq: function(callback) {
        toggleCurrentRequirement(req.body.scoutId, req.params.requirementId, result.scoutRequirements.toJSON(), result.advancementRequirements.toJSON(), function(data) {
          callback(null, data);
        });
      },
      parentReq: function(callback) {
        toggleCurrentParent(req.body.scoutId, req.params.requirementId, result.scoutRequirements.toJSON(), result.advancementRequirements.toJSON(), function(data) {
          callback(null, data);
        });
      }
    }, function(err, result) {
      var r = [];
      r.push(result.currentReq);
      if(result.parentReq) {
        r.push(result.parentReq);
      }
      res.json(r);
    });
  });
};