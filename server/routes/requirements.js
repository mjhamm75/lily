/* global exports, require */

var Bookshelf = require('bookshelf').PG;

var ScoutRequirements = Bookshelf.Model.extend({
  tableName: 'scout_requirements',
  idAttribute: null
});

exports.toggleRequirement = function(req, res) {
  var scoutRequirement = new ScoutRequirements({
    scout_id: req.body.scoutId,
    requirement_id: req.body.requirementId,
  });
  scoutRequirement.fetch().then(function(data) {
    if(data === null) {
      scoutRequirement.set('initials', 'mjh');
      scoutRequirement.set('completed_date', '2014-04-09');
      scoutRequirement.save().then(function(data) {
        res.json(data);
      });
    } else {
      Bookshelf.knex('scout_requirements')
        .where('scout_id', '=', req.body.scoutId)
        .where('requirement_id', '=', req.body.requirementId)
        .del().then(function(data) {
          res.json({
            deleted: true
          });
        });
    }
  });
};
