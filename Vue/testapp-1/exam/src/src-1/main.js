import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Router from 'vue-router'


import Home from './components/Home.vue'
import ExamSession from './components/ExamSession.vue'
import ExamSessionDetail from './components/ExamSessionDetail.vue'

import VueRouter from 'vue-router'

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
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')