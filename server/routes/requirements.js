/* global exports, require */

var async = require('async');
var _ = require('underscore');
var common = require('./../common/common.js');

var toggleScoutRequirement = function(scoutId, scoutRequirement, advancementRequirement, callback) {
  'use strict';
  if(scoutRequirement === undefined) {
    common.updateScoutRequirement(advancementRequirement.requirement_id, scoutId, function(data) {
      callback(data);
    });
  } else {
    var id = advancementRequirement.requirement_id;
    common.deleteScoutRequirement(id, scoutId, function(data) {
      callback(data);
    });
  }
};

var getChildrenComplete = function(scoutId, children, callback) {
  'use strict';
  common.getScoutRequirements(scoutId, function(scoutReqs) {
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

var updateReqsCount = function(req, callback) {
    'use strict';
    async.parallel({
      scoutRequirements: function(callback) {
        common.getScoutRequirements(req.body.scoutId, function(data) {
          callback(null, data);
        });
      },
      advancementRequirements: function(callback) {
        common.getAdvancementRequirements(req.body.advancementId, function(data) {
          callback(null, data);
        });
      }
    }, function(err, result) {
      var reqs = common.combineRequirementsWithScoutRequirements(result.advancementRequirements.toJSON(), result.scoutRequirements.toJSON());
      var completed = _.filter(reqs, function(r) {
        return r.completed_date !== null;
      });
      callback(completed.length);
    });
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
        common.updateScoutRequirement(parentReq.requirement_id, scoutId, function(data) {
          callback(data);
        });
      } else {
        var id = parentReq.requirement_id;
        common.deleteScoutRequirement(id, scoutId, function(data) {
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
      common.getScoutRequirements(req.body.scoutId, function(data) {
        callback(null, data);
      });
    },
    advancementRequirements: function(callback){
      common.getAdvancementRequirements(req.body.advancementId, function(data) {
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
      updateReqsCount(req, function(countComplete) {
        var r = [];
        r.push(result.currentReq);
        if(result.parentReq) {
          r.push(result.parentReq);
        }
        r.meta = {
          countComplete: countComplete
        };
        console.log(r);
        res.json(r);
      });
    });
  });
};