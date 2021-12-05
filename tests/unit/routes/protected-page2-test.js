import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | protectedPage2', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:protected-page2');
    assert.ok(route);
  });
});
