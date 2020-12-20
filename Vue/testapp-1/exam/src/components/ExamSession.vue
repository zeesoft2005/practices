<template>
  
   <div class="container mt-1">
   
        <div class="row gx-5">
            <div class="col">
                <h5><strong class="text-danger">CS101-8 </strong>Introduction to Computer Engineering</h5>
            </div>
            <div class="col text-end ">
                <h5 class="floatRight"><strong class="text-danger ">11686 </strong>Zeeshan Ahmed</h5>
            </div>
        </div>
         <ExamSessionDetail :QuestionID = "QuestionID"> </ExamSessionDetail>

       
     </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import ExamSessionDetail from './ExamSessionDetail.vue'


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
        this.loadQ(0, this.handleResponse);

      },
      beforeMount:function(){
        console.log('LIFECYCLE:: beforeMount')

      },
      mounted:function(){
        console.log('LIFECYCLE:: mounted');
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
     handleResponse(response){
        this.QuestionID = response.data[0].QuestionID;
        console.log('Question loaded:'+ JSON.stringify(response.data));
    },
    mockQ(){
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
      TimeElapsed : 10,
      QuestionID: 0,
      Alert: 'Please attempt the question as directed...',
      displayAlert: function(e){
          this.Alert = e;
      }
    }
  },
  components:{
 ExamSessionDetail, 
   //CountDown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.floatRight{
  float: right;
}
</style>
