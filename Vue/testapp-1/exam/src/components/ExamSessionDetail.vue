<template>

  <div class="card">
            <div class="card-header">
                <div class="row gx-5">
                    <div class="col">
                        <h4>Question No: 1 of 30</h4>
                    </div>
                    <div class="col text-end ">
                        <h5 class="floatRight">Marks 1 (Budgeted Time: 1 Minute)</h5>
                    </div>
                </div>
            </div>
          
                
  <ExamQuestions v-on:USER_RESPONSE="updateResponse($event)" 
   :QuestionID ="CurrentQuestion.QuestionID"
   :QuestionText="CurrentQuestion.QuestionText"
   :QuestionTypeID="CurrentQuestion.QuestionTypeID"
   :Options="CurrentQuestion.Options"  >
  </ExamQuestions>
  
      <div class="card-footer">
                    <div class="row">
                        <div class="col">
                            <h3><span class="badge bg-success text-center"><i class="fa fa-clock"></i> <span id='countDownDisplay'>    <CountDown :Minutes="1"/>
</span><br /><span
                                        style="font-size: x-small;" id='startTimeDisplay'>Start time: <span>{{this.getStartDateTime()}}</span></span></span></h3>
                        </div>
                        <div class="col">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    <div class="page-item"><a class="page-link bg-primary text-light" data-bs-toggle="modal" data-bs-target="#exampleModal" href="">
                                            <i class="fas fa-info-circle"></i></a></div>
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"><i
                                                class="fas fa-step-backward"></i></a>
                                    </li>
                                    <li class="page-item "><b-link class="page-link" href="#" tabindex="-1"  v-on:click= "prevQ"
                                            aria-disabled="true"><i class="fas fa-backward"></i></b-link></li>
                                    <li class="page-item"><b-link class="page-link" href="#" v-on:click= "nextQ"><i
                                                class="fas fa-forward" ></i></b-link></li>
                                    <li class="page-item"><a class="page-link" href="#"><i
                                                class="fas fa-step-forward"></i></a></li>
                                    <li class="page-item"><a class="page-link bg-success text-light" href="#" ><i class="fas fa-save"></i> Save</a>
                                    </li>
                                    <li class="page-item"><a class="page-link bg-danger text-light" href="#"><i class="fas fa-stop"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
      </div>
       
  
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import ExamQuestions from './ExamQuestions.vue'
import CountDown from './CountDown.vue'

export default {
  name: 'ExamSessionDetail',
  props: ['ID','QuestionID'], 
  components:{
    ExamQuestions,
    CountDown

  },
  data(){
    return {
            QClicked: this.$route.params.QuestionID || this.QuestionID, 
            CurrentQuestion: {
            IsQuestionAttempted:false,
            QuestionText:null,
            QuestionTypeID: 0,
            Options:[],
     }
    }
  },
    created:function(){
        console.log('QD::LIFECYCLE:: created:'+this.QuestionID)

      },
     updated:function(){
        console.log('QD:: updated:'+this.QuestionID)
        console.log(this.QClicked);

      },
   mounted:function(){
        console.log('QD::LIFECYCLE:: mounted:'+this.QuestionID);
        this.loadQ(this.QuestionID, this.handleResponse);

      },
  methods:{
     getStartDateTime: function (){
      var d = new Date(); // for now
      return d.getHours() + ': ' + d.getMinutes() + ':' + d.getSeconds(); 
    },
    prevQ(){
              this.loadQ(1, this.handleResponse);
    },
    nextQ(){
              this.loadQ(2, this.handleResponse);
    },
    handleResponse(response){
       this.CurrentQuestion = response.data.length?  response.data[0] : {};
          console.log('Question loaded:'+ JSON.stringify(response.data[0]));
    },
   
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


