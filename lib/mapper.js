'use strict';

/**
 * Module dependencies.
 */

var del = require('obj-case').del;
var reject = require('reject');
var time = require('unix-time');

/**
 * Identify.
 *
 * @param {Identify} identify
 * @return {Object}
 * @api private
 */

exports.identify = function(identify){
  return reject({
    auth_token: this.settings.authToken,
    id: identify.userId(),
    email: identify.email(),
    data: identify.traits(),
  });
};

/**
 * Track.
 *
 * @param {Track} track
 * @param {Object} settings
 * @return {Object}
 * @api private
 */

exports.track = function(track){
  return reject({
    auth_token: this.settings.authToken,
    event_name: track.event(),
    data: track.properties(),
    identity: {
      id: track.userId(),
      email: track.email()
    },
    extras: {
      created_at: time(track.timestamp())
    }
  });
};

/**
 * Group.
 *
 * @param {Group} group
 * @return {Object}
 * @api private
 */

exports.group = function(group){
  var traits = group.traits();
  del(traits, 'email');

  return reject({
    auth_token: this.settings.authToken,
    id: group.userId(),
    email: group.email(),
    changes: {
      group: traits
    }
  });
};

/**
 * Alias.
 *
 * @param {Track} track
 * @param {Object} settings
 * @return {Object}
 * @api private
 */

exports.alias = function(alias){
  return {
    auth_token: this.settings.authToken,
    id: alias.from(),
    new_id: alias.to()
  };
};