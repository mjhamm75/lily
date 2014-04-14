/* global require, describe, it, expect */

var requirements = require('../common.js');
var advancementJson = require('./test.data.js').advancements;
var scoutRequirementJson = require('./test.data.js').scoutRequirements;

describe('it should be true', function() {
  it('should be true', function() {
    var requirementJson = requirements.combineRequirementsWithScoutRequirements(advancementJson, scoutRequirementJson);
    var result = {
      id: 89,
      completed_date: '2014-01-12T00:00:00.000Z',
      description: 'Meet the age requirements. Be a boy who is 11 years old, or one who has completed the fifth grade or earned the Arrow of Light Award and is at least 10 years old, but is not yet 18 years old.',
      initials: 'mjh'
    };
    expect(requirementJson[0]).toEqual(result);
    expect(requirementJson.length).toBe(10);
  });
});
