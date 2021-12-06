import Component from '@glimmer/component';
import { action } from '@ember/object';
import cookies from 'ember-cli-js-cookie';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Protected2Component extends Component{
    @service router;
    @tracked topHits;

    constructor() {
        super(...arguments);

        const crtr = localStorage.getItem('criteria');
        const val = localStorage.getItem('value');
        const eventCat = localStorage.getItem('eventCategory');

        var formdata = {
            criteria: crtr,
            value: val,
            eventCategory: eventCat,
          };

          var result = $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/EsBackend/webapi/getTopHits',
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
      
          this.topHits = JSON.parse(result);
          console.log(this.topHits);   
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