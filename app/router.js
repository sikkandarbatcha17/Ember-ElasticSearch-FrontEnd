import EmberRouter from '@ember/routing/router';
import config from 'simple-login/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login-page', { path: '/' });
  this.route('protectedPage');
  this.route('protectedPage1');
  this.route('protectedPage2');
});
