import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import cookies from 'ember-cli-js-cookie';


export default class PaginationComponent extends Component {
  @service router;

  constructor() {
    super(...arguments);

    const totalPages = localStorage.getItem('noOfPages');
    const currentPage=Number(localStorage.getItem('currentPage'));

    const nav=document.createElement('nav');
    nav.ariaLabel="Navigation for eventLogs";
    document.body.appendChild(nav);

    const ul= document.createElement('ul');
    ul.classList.add("pagination");

    if(currentPage!=1){
      const prevPage = document.createElement('li');
      prevPage.classList.add("page-item");
      const link= document.createElement('a');
      link.classList.add("page-link");
      link.setAttribute('href',"");
      prevPage.appendChild(link);
      let text = document.createTextNode("Previous");
      link.appendChild(text); 
      prevPage.onclick = function () {
        localStorage.setItem('currentPage', currentPage-1);
        console.log(currentPage);
        window.location.reload(true);  
    };
    ul.appendChild(prevPage);
    }
    
    for (let i = 1; i <= totalPages; i++) {
      if(currentPage==Number(i)){
        const li =document.createElement('li');
        li.classList.add("active");
        const a= document.createElement('a');
        a.classList.add("page-link");
        a.setAttribute('href',"");
        let text = document.createTextNode(i);
        a.appendChild(text); 
        const span=document.createElement('span');
        span.classList.add("sr-only");
        let text1=document.createTextNode("(current)");
        span.appendChild(text1);
        a.appendChild(span);
        li.appendChild(a);
        li.onclick = function () {
          let currPage = Number(i);
          localStorage.setItem('currentPage', currPage);
          window.location.reload(true);
          console.log(currPage);
        };
        ul.appendChild(li);
      }
      else{
        const li =document.createElement('li');
        li.classList.add("page-item");
        const a= document.createElement('a');
        a.classList.add("page-link");
        a.setAttribute("href","");
        let text = document.createTextNode(i);
        a.appendChild(text); 
        li.appendChild(a);
        li.onclick = function () {
          let currPage = Number(i);
          localStorage.setItem('currentPage', currPage);
          window.location.reload(true);
          console.log(currPage);
        };
        ul.appendChild(li);
      }
      
    }

      if(currentPage<totalPages)
      {
        const nextPage = document.createElement('li');
        nextPage.classList.add("page-item");
        const link= document.createElement('a');
        link.classList.add("page-link");
        link.setAttribute('href',"");
        let text = document.createTextNode("Next");
        link.appendChild(text);
        nextPage.appendChild(link); 
        nextPage.onclick = function () {
          localStorage.setItem('currentPage', currentPage+1);
          console.log(currentPage);
          window.location.reload(true);  
        };
        ul.appendChild(nextPage);
      }
      nav.appendChild(ul);
   }

   @action
  invalidate() {
    cookies.remove('username');
    cookies.remove('isvalidated');
    localStorage.clear();
    this.router.transitionTo('login-page');
  }
}
