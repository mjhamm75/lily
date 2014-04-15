/* global exports, require */

var Bookshelf = require('bookshelf').PG;

var ScoutRequirement = Bookshelf.Model.extend({
  tableName: 'scout_requirements',
  idAttribute: null
});

var ScoutRequirements = Bookshelf.Collection.extend({
  model: ScoutRequirement
});

exports.toggleRequirement = function(req, res) {
  var scoutRequirements = new ScoutRequirements();
  scoutRequirements.query({
    where: {
      scout_id: req.body.scoutId
    }
  }).fetch().then(function(data) {
    var scoutRequirement = data.find(function(model) {
      return model.get('requirement_id') === req.body.requirementId;
    });
    if(scoutRequirement === undefined) {

      var scoutRequirement = new ScoutRequirement();
      scoutRequirement.set('requirement_id', req.body.requirementId);
      scoutRequirement.set('scout_id', req.body.scoutId);
      scoutRequirement.set('initials', 'mjh');
      scoutRequirement.set('completed_date', '2014-04-09');
      scoutRequirement.save().then(function(data) {
        res.json(data);
      });
    } else {
      scoutRequirement.where({
        requirement_id: red.body.requirementId
      }).destroy().then(function(data) {
        res.json({
          deleted: true
        })
      })
    }
  });
}