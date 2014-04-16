/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var async = require('async');

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

// exports.toggleRequirement = function(req, res) {
//   var scoutRequirements = new ScoutRequirements();
//   scoutRequirements.query({
//     where: {
//       scout_id: req.body.scoutId
//     }
//   }).fetch().then(function(data) {
//     var scoutRequirement = data.find(function(model) {
//       return model.get('requirement_id') === req.body.requirementId;
//     });
//     if(scoutRequirement === undefined) {

//       var scoutRequirement = new ScoutRequirement({
//         requirement_id: req.body.requirementId,
//         scout_id: req.body.scoutId,
//         initials: 'mjh',
//         completed_date: '2014-04-10'
//       });

//       scoutRequirement.save().then(function(data) {
//         res.json(data);
//       });
//     } else {
//       Bookshelf.knex('scout_requirements')
//         .where('scout_id', req.body.scoutId)
//         .where('requirement_id', req.body.requirementId)
//         .del().then(function(data) {
//           res.json({
//             deleted: true
//           })
//         });
//     }
//   });

var toggleScoutRequirement = function(requirementId, scoutId, scoutRequirement, callback) {
  if(scoutRequirement === undefined) {
    var scoutRequirement = new ScoutRequirement({
      requirement_id: requirementId,
      scout_id: scoutId,
      initials: 'mjh',
      completed_date: '2014-04-10'
    });
    scoutRequirement.save().then(function(data) {
      callback(data);
    });
  } else {
    Bookshelf.knex('scout_requirements')
      .where('scout_id', scoutId)
      .where('requirement_id', requirementId)
      .del().then(function(data) {
        callback({
          deleted: true
        });
      });
  }
};

var getModelById = function(collection, id) {
  var result = collection.find(function(model) {
    return model.get('requirement_id') == id;
  })
  return result;
};

var getScoutRequirements = function(scoutId, callback) {
  var scoutRequirements = new ScoutRequirements();
  scoutRequirements.query({
    where: {
      scout_id: scoutId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
}

var getAdvancementRequirements = function(advancementId, callback) {
  var advancementRequirements = new AdvancementRequirements();
  advancementRequirements.query({
    where: {
      advancement_id: advancementId
    }
  }).fetch().then(function(data) {
    callback(data);
  })
}

exports.toggleRequirement = function(req, res) {
  async.parallel({
    scoutRequirements: function(callback) {
      getScoutRequirements(req.body.scoutId, function(data) {
        callback(null, data)
      });
    },
    advancementRequirements: function(callback){
      getAdvancementRequirements(req.body.advancementId, function(data) {
        callback(null, data);
      })
    }
  }, function(err, result) {
    var scoutRequirement = getModelById(result.scoutRequirements, req.params.id);
    var result = toggleScoutRequirement(req.params.id, req.body.scoutId, scoutRequirement, function(data) {
      res.json(data);
    });
  });
};