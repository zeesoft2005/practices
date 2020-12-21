import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import Home from './components/Home.vue'
import ExamSession from './components/ExamSession.vue'
import ExamSessionDetail from './components/ExamSessionDetail.vue'

import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//import { faUserSecret } from '@fortawesome/pro-regular-svg-icons'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
import store from './store/store'

import CKEditor from 'ckeditor4-vue';

Vue.use( CKEditor );

Vue.use(store)

Vue.use(Vuex)

Vue.use(Router);
const routes = [{ path: '/', component: Home }, { path: '/start', component: ExamSession },
{ path: '/question/:QuestionID', component: ExamSessionDetail }];
const router = new VueRouter({
  routes
});
Vue.config.productionTip = false;

Vue.filter('countdown', function ( minutes, displayElement) {
    function startTimer(duration, display) {
       var minutes, seconds;
       var _timer =  setInterval(function () {
            minutes = parseInt(duration / 60, 10);
            seconds = parseInt(duration % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
          if (display) {
            display.textContent = minutes + ":" + seconds;
          }

            if (--duration < 0) {
                //timer = duration;
              clearInterval(_timer);
            }
        }, 1000);
    }
    //convert minutes to secs and start timer
    var minutesInSecs = 60 * minutes;
    startTimer(minutesInSecs, displayElement);
  
});
 
Vue.mixin({
  methods: {
    loadQ(QuestionID, onsuccess, onfailure){
        if(!onsuccess)
          throw 'must specify a handler on success';
        var api = QuestionID? 'http://localhost:3000/questions?QuestionID='+ QuestionID : 'http://localhost:3000/questions';        
        Vue.axios.get(api).then((response) => {
          onsuccess(response);         
        }).catch((reason)=>{
          if(onfailure)
          onfailure(reason);
        });
    },
  },
})
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')