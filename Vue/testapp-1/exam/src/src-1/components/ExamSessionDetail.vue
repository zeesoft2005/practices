<template>
  <div class="examSessionDetail">
  <span 
  v-bind:style = "{'font-weight': 'bold'}"
  v-bind:class = "[CurrentQuestion.IsQuestionAttempted?'clsQAttempted':'clsQNotAttempted']"

  > {{ CurrentQuestion.IsQuestionAttempted? '': '*' }}</span>
  <ExamQuestions v-on:USER_RESPONSE="updateResponse($event)" 
   :QuestionID ="CurrentQuestion.QuestionID"
   :QuestionText="CurrentQuestion.QuestionText"
   :QuestionTypeID="CurrentQuestion.QuestionTypeID"
   :Options="CurrentQuestion.Options"  >
  </ExamQuestions>
  <b-button variant="success" v-on:click="saveChanges">Save Changes</b-button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ExamQuestions from './ExamQuestions.vue'

export default {
  name: 'ExamSessionDetail',
  props: ['ID','QuestionID'], 
  components:{
    ExamQuestions
  },
  data(){
    return {
            QClicked: this.$route.params.QuestionID || this.QuestionID,
 
      CurrentQuestion: {
     IsQuestionAttempted:false,
     QuestionText:null,
     QuestionTypeID: 0,
     Options:[]
     }
    }
  },
     updated:function(){
        console.log('QD:: updated')
        console.log(this.QClicked);
      },
   mounted:function(){
        console.log('LIFECYCLE:: mounted');
        this.loadQ();
      },
  methods:{
    loadQ(){
        var api =  'http://localhost:3000/questions?QuestionID='+this.QClicked;        
        Vue.axios.get(api).then((response) => {
          this.CurrentQuestion = response.data.length?  response.data[0] : {};
          console.log('Question loaded:'+ JSON.stringify(response.data[0]));
        }).catch((reason)=>{
          console.log('Question could not load...'+ reason);
        });
    },
    saveChanges : function(){
        console.log('saving changes...');
        //console.log('User Response:' + this.Response.OptionID);
        this.$emit('onalert', 'Changes Saved Successfully: '+ this.Response.OptionID);
    },
    updateResponse:function(selection){      
        this.Response = this.Response || {};
        this.Response.QuestionID = selection.QuestionID;
        this.Response.OptionID = selection.OptionID;
        this.CurrentQuestion.IsQuestionAttempted = true;
        console.log(JSON.stringify( this.Response));

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.examSessionDetail {
 font-weight: bold;
}
.clsQAttempted{
 color: green;
}
.clsQNotAttempted{
 color: #4116db;
}
</style>
