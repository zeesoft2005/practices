<template>
  <div class="examSession">
    <h1>{{ IsInProgress? 'Exam session is alive':'Exam session is not active' }}</h1>  
    <h2>{{TimeElapsed}}</h2>
    <span>{{Alert}}</span>
    <!-- <span> {{234.567 | twoDecimal}}</span> -->
    <CountDown :Minutes="1"/>
    <!-- <ul>
      <li v-for="item in examQuestions" :key="item.QuestionID">
{{item.QuestionID}}      </li>
    </ul> -->
    <!-- <span>{{StartDateTime}}</span> -->
 <div v-for="Qs in examQuestions" :key="Qs.QuestionID">
    <router-link   :to="'question/'+ Qs.QuestionID" >{{Qs.QuestionID}}</router-link>
 </div>
 <ExamSessionDetail QuestionID = "1"> </ExamSessionDetail>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ExamSessionDetail from './ExamSessionDetail.vue'
import CountDown from './CountDown.vue'

export default {
  name: 'ExamSession',
  props: {
    IsInProgress: Boolean,    
    
  },
      beforeCreate:function(){
        console.log('LIFECYCLE:: beforeCreated')
      },
      created:function(){
        console.log('LIFECYCLE:: created')
      },
      beforeMount:function(){
        console.log('LIFECYCLE:: beforeMount')
      },
      mounted:function(){
        console.log('LIFECYCLE:: mounted');
        this.loadQs();
      },
       beforeUpdate:function(){
        console.log('LIFECYCLE:: beforeUpdate')
      },
       updated:function(){
        console.log('LIFECYCLE:: updated')
        console.log(this.QClicked);
      },
       beforeDestroy:function(){
        console.log('LIFECYCLE:: beforeDestroy')
      },
       destroyed:function(){
        console.log('LIFECYCLE:: destroyed')
      },
filters: {
    twoDecimal (value) {
      return value.toFixed(2)
    }
  },
  methods:{
    loadQs(){
        var api =  'http://localhost:3000/questions';        
        Vue.axios.get(api).then((response) => {
          this.examQuestions = response.data;

          //this.examQuestions.push(response.data);
          console.log('Question loaded:'+ JSON.stringify(response.data));

          console.log(response.data)
        }).catch((reason)=>{
          console.log('Questions could not load...defaulting to mock data:'+ reason);
          this.mockQs();
        });
    },
    mockQs(){
      return  [
        {
          "QuestionID": 1,
          "QuestionTypeID": 1,
          "Options": [
            {
              "ID": 1,
              "Title": "Options 1",
              "OptionsTypeID": 1
            },
            {
              "ID": 2,
              "Title": "Options 2",
              "OptionsTypeID": 1
            }
          ],
          "IsQuestionAttempted": true,
          "AnswerGiven": false
        }
      ];
    }
  },
  data(){
    return {
      examQuestions :[],
      TimeElapsed : 10,
      detailID: 12,
      Alert: 'Please attempt the question as directed...',
      displayAlert: function(e){
          this.Alert = e;
      }
    // StartDateTime: function (){
    //   var d = new Date(); // for now
    //   return d.getHours() + ': ' + d.getMinutes() + ':' + d.getSeconds(); 
    // },
    }
  },
  components:{
   ExamSessionDetail, 
   CountDown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.examSession {
  color: #42b983;
}
</style>
