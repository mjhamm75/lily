/* global exports*/

var Bookshelf = require('bookshelf').PG;
var _ = require('underscore');

var Advancement = Bookshelf.Model.extend({
  tableName: 'advancements'
});

var Scout = Bookshelf.Model.extend({
  tableName: 'scouts',

  advancements: function() {
    'use strict';
    return this.belongsToMany(Advancement, 'scout_advancements', 'scout_id', 'advancement_id');
  }
});

var Scouts = Bookshelf.Collection.extend({
  model: Scout
});

var organizeScoutJson = function(json) {
  'use strict';
  var first = _.first(json);
  var result = {
    scout_id: first.scout_id,
    first_name: first.first_name,
    last_name: first.last_name,
    email: first.email,
    password: first.password,
    address: first.address,
    city: first.city,
    state: first.state,
    zip: first.zip
  };

  var ranks = _.chain(json)
    .filter(function(advancement) {
      return advancement.type === 'Rank';
    })
    .map(function(r) {
      return {
        advancement_id: r.advancement_id,
        date_complete: r.date_complete,
        num_requirements: r.num_requirements,
        reqs_complete: r.reqs_complete,
        name: r.name,
        eagle_required: r.eagle_required
      };
    })
    .value();
  var merit_badges = _.chain(json)
    .filter(function(advancement) {
      return advancement.type === 'Merit Badge';
    })
    .map(function(r) {
      return {
        advancement_id: r.advancement_id,
        date_complete: r.date_complete,
        num_requirements: r.num_requirements,
        reqs_complete: r.reqs_complete,
        name: r.name,
        eagle_required: r.eagle_required
      };
    })
    .value();
  result.ranks = ranks;
  result.merit_badges = merit_badges;
  return result;
};

exports.getScout = function(req, res) {
  'use strict';
  Bookshelf.knex('scouts')
  .join('scout_advancements', 'scouts.id', '=', 'scout_advancements.scout_id')
  .join('advancements', 'scout_advancements.advancement_id', '=', 'advancements.id')
  .where('scouts.id', '=', 1)
  .orderBy('advancements.id', 'asc')
  .then(function(data) {
    var result = organizeScoutJson(data);
    res.json(result);
  });
};

exports.getScouts = function(req, res) {
  'use strict';
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
  'use strict';
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
