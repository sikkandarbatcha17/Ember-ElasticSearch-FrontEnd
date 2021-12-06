import Controller from '@ember/controller';
import $ from 'jquery';
import cookies from 'ember-cli-js-cookie';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service router;

  errormsg = 'Invalid Credentials';
  error = false;

  @action
  validate_user() {
    var uname = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    var result = $.ajax({
      type: 'POST',
      url: 'http://localhost:8081/EsBackend/login',
      data: {
        uname: uname,
        pass: pass,
      },
      global: false,
      async: false,
      success: function (dat) {
        return dat;
      },
      error: function (err) {
        console.log(err);
      },
    }).responseText;

    const rsObj = JSON.parse(result);

    console.log(typeof rsObj, rsObj);

    if (rsObj.isValidated) {
      cookies.set('username', rsObj.userName);
      cookies.set('isvalidated', rsObj.isValidated);
      sessionStorage.setItem("username", uname);
      this.set('error', false);
      this.router.transitionTo('protectedPage');
    } else {
      this.set('error', true);
    }
  }
}
