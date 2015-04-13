import Ember from 'ember';

var Router = Ember.Router.extend({});

Router.map(function() {
  this.resource('charts', function() {
    this.route('column',  function() {});
    this.resource('line',function() {
      this.route('dynamic', function() {});
    });
  });
});

export default Router;
