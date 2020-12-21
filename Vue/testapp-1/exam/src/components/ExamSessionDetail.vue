<template>

  <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <h4>Question No: {{QuestionIndex}} of {{totalCount}}</h4>
                    </div>
                    <div class="col text-right ">
                        <h5 class="">Marks 1 (Budgeted Time: 1 Minute)</h5>
                    </div>
                </div>
            </div>
          
                
  <ExamQuestions v-on:USER_RESPONSE="updateResponse($event)" 
   :QuestionID ="CurrentQuestion.QuestionID"
   :QuestionText="CurrentQuestion.QuestionText"
   :QuestionTypeID="CurrentQuestion.QuestionTypeID"
   :Options="CurrentQuestion.Options"  >
  </ExamQuestions>
  
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ExamQuestions from './ExamQuestions.vue'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'ExamSessionDetail',
  props: ['ID','QuestionID','QuestionIndex'], 
  components:{
    ExamQuestions
  },
  computed: {
    ...mapState([
    'questions','totalCount'
  ]),
     ...mapGetters({getQuestion: 'getQByID'}),

  },
  data(){
    return {
            CurrentQuestion: {
            IsQuestionAttempted:false,
            QuestionText:null,
            QuestionTypeID: 0,
            Options:[],
     }
    }
  },
    
   mounted:function(){
     if(!this.QuestionID){
        return
     }
        console.log('QD::LIFECYCLE:: mounted:'+ this.QuestionID);
         this.CurrentQuestion = this.getQuestion(this.QuestionID);
         console.log('CurrentQuestion:'+ JSON.stringify(this.CurrentQuestion));

      },
  methods:{
   
    saveChanges : function(){
        console.log('saving changes...');
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


