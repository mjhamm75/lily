/* global exports*/

var Bookshelf = require('bookshelf').PG;
var _ = require('underscore');

var Advancement = Bookshelf.Model.extend({
  tableName: 'advancements'
});

var Scout = Bookshelf.Model.extend({
  tableName: 'scouts',

  advancements: function() {
    return this.belongsToMany(Advancement, 'scout_advancements', 'scout_id', 'advancement_id');
  }
});

var Scouts = Bookshelf.Collection.extend({
  model: Scout
});


var Advancements = Bookshelf.Model.extend({
  model: Advancement
});

var organizeScoutJson = function(json) {
  json = json.toJSON();
  var ranks = _.chain(json.advancements)
    .filter(function(advancement) {
      return advancement.type === 'Rank'
    })
    .map(function(r) {
      delete r._pivot_scout_id;
      delete r._pivot_advancement_id;
      return r;
    })
    .value();
  var merit_badges = _.chain(json.advancements)
    .filter(function(advancement) {
      return advancement.type === 'Merit Badge'
    })
    .map(function(r) {
      delete r._pivot_scout_id;
      delete r._pivot_advancement_id;
      return r;
    })
    .value();
  delete json.advancements;
  json.ranks = ranks;
  json.merit_badges = merit_badges;
  return json;
};

exports.getScout = function(req, res) {
  var scout = new Scout({id: req.params.id});
  scout.fetch({
    withRelated: ['advancements']
  }).then(function(data) {
    var result = organizeScoutJson(data);
    console.log(result);
    res.json(result);
  });
};

exports.getScouts = function(req, res) {
  var scout = new Scouts();
  scout.fetch().then(function(collection) {
    var response = {
      meta: {},
      scouts: collection
    };
    res.json(response);
  });
};

exports.createScout = function(req, res) {
  var scout = new Scout();
  scout.set('first_name', req.body.first_name);
  scout.set('last_name', req.body.last_name);
  scout.set('rank', req.body.rank);
  scout.set('email', req.body.email);
  scout.set('password', req.body.password);
  scout.set('address', req.body.address);
  scout.set('city', req.body.city);
  scout.set('state', req.body.state);
  scout.set('zip', req.body.zip);
  scout.save().then(function(data) {
    res.json(data);
  });
};
