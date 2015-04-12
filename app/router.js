import Ember from 'ember';

var Router = Ember.Router.extend({});

Router.map(function() {
  this.resource('charts', { path: '/' }, function() {
    this.route('column', { path: '/column' }, function() {});
    this.resource('line', { path: '/line' },function() {
      this.route('dynamic', { path: '/dynamic'}, function() {});
    });
  });
});

export default Router;
