import Component from '@glimmer/component';
import { action } from '@ember/object';
import cookies from 'ember-cli-js-cookie';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Protected1Component extends Component {
  @service router;
  @tracked currentPage;
  @tracked value;
  @tracked criteria;

  username = cookies.get('username');

  constructor() {
    super(...arguments);
    const currPage = localStorage.getItem('currentPage');
    const recPerPage = localStorage.getItem('recordsPerPage');
    const crtr = localStorage.getItem('criteria');
    const val = localStorage.getItem('value');
    const totalPages = localStorage.getItem('noOfPages');

    var formdata = {
      currentPage: currPage,
      recordsPerPage: recPerPage,
      criteria: crtr,
      value: val,
    };

    var result = $.ajax({
      type: 'POST',
      url: 'http://localhost:8081/EsBackend/webapi/readdata',
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

    this.logs = JSON.parse(result);
    console.log(this.logs);

    this.currentPage = currPage;
    this.criteria = crtr;
    this.value = val;
  }

  @action
  toggleCompleted(eventCat) {
    localStorage.setItem('eventCategory', eventCat);
    this.router.transitionTo('protectedPage2');
  }

}
