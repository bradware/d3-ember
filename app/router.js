import Ember from 'ember';

var Router = Ember.Router.extend({});

Router.map(function() {
  this.resource('charts', { path: '/' }, function() {
    this.route('column', { path: '/column' }, function() {});
    this.route('line', { path: '/line' });
  });
});

export default Router;
