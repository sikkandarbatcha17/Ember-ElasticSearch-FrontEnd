import Component from '@glimmer/component';
import { action } from '@ember/object';
import cookies from 'ember-cli-js-cookie';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class ProtectedComponent extends Component {
  @service router;
  username = cookies.get('username');

  @action
  search_logs() {
    var currPage = Number(document.getElementById('currentPage').value);
    var recPerPage = Number(document.getElementById('records').value);
    var crtr = String(document.getElementById('items').value);
    var val = String(document.getElementById('value').value);

    var formdata = {
      currentPage: currPage,
      recordsPerPage: recPerPage,
      criteria: crtr,
      value: val,
    };

    var result1 = $.ajax({
      type: 'POST',
      url: 'http://localhost:8081/EsBackend/webapi/getpages',
      contentType: 'application/json',
      data: JSON.stringify(formdata),
      global: false,
      async: false,
      success: function (dat) {
        return dat;
      },
      error: function (err) {
        console.log(err);
      },
    }).responseText;

    this.totalPages = JSON.parse(result1);
    console.log(this.totalPages);

    localStorage.setItem('currentPage', currPage);
    localStorage.setItem('recordsPerPage', recPerPage);
    localStorage.setItem('criteria', crtr);
    localStorage.setItem('value', val);
    localStorage.setItem('noOfPages', Number(this.totalPages));

    this.router.transitionTo('protectedPage1');
  }

  @action
  invalidate() {
    cookies.remove('username');
    cookies.remove('isvalidated');
    localStorage.clear();
    sessionStorage.clear();
    this.router.transitionTo('login-page');
  }
}
