import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import cookies from 'ember-cli-js-cookie';

export default class ProtectedPage1Route extends Route {
  isvalidated = cookies.get('isvalidated');

  @tracked username = cookies.get('username');

  beforeModel() {
    if (!cookies.get('isvalidated')) {
      this.transitionTo('login-page');
    }
  }
}
