<template>  
   <div class="container mt-1">   
        <div class="row">
            <div class="col">
                <h5><strong class="text-danger">{{session.CourseID}} </strong>{{session.CourseName}}</h5>
            </div>
            <div class="col text-right ">
                <h5 class=""><strong class="text-danger ">{{session.CandidateID}} </strong>{{session.CandidateName}}</h5>
            </div>
        </div>
         <ExamSessionDetail :QuestionID = "QuestionID" :key="QuestionID" :QuestionIndex = "questionCounter"> </ExamSessionDetail>

               <div class="card-footer">
                    <div class="row">
                        <div class="col">
                            <h3><span class="badge bg-success text-center"><i class="fa fa-clock"></i> <span id='countDownDisplay'>   

                               <CountDown v-bind:Minutes="totalTime"/>
</span><br /><span
                                        style="font-size: x-small;" id='startTimeDisplay'>Start time: <span>{{this.getStartDateTime()}}</span></span></span></h3>
                        </div>
                        <div class="col">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    <div class="page-item"><a class="page-link bg-primary text-light" data-toggle="modal" data-target="#exampleModal" href="">
                                            <i class="fas fa-info-circle"></i></a></div>
                                    <li v-bind:class="{ disabled: NoPrevItem }" class="page-item">
                                        <a class="page-link" href="#" tabindex="-1" v-bind:aria-disabled="NoPrevItem"><i
                                                class="fas fa-step-backward"></i></a>
                                    </li>
                                    <li  v-bind:class="{ disabled: NoPrevItem }" class="page-item "><b-link class="page-link" href="#" tabindex="-1"  v-on:click= "prevQ"
                                             v-bind:aria-disabled="NoPrevItem"><i class="fas fa-backward"></i></b-link></li>
                                    <li  v-bind:class="{ disabled: NoNextItem }"  class="page-item"><b-link class="page-link" href="#" v-on:click= "nextQ"><i
                                                class="fas fa-forward" ></i></b-link></li>
                                    <li  v-bind:class="{ disabled: NoNextItem }"  class="page-item"><a class="page-link" href="#"><i
                                               v-bind:aria-disabled="NoNextItem"  class="fas fa-step-forward"></i></a></li>
                                    <li class="page-item"><a class="page-link bg-success text-light" href="#" ><i class="fas fa-save"></i> Save</a>
                                    </li>
                                    <li class="page-item"><a class="page-link bg-danger text-light" href="#"><i class="fas fa-stop"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
      </div>
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Instructions</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut pulvinar sem. Nam non neque sagittis, dictum diam ut, ultricies turpis. Aliquam gravida ac nisi euismod consequat. Sed posuere ac felis ut pretium. Maecenas vel malesuada ipsum. Maecenas non dolor ullamcorper, cursus urna at, porta felis. Ut sed feugiat erat, consectetur feugiat ante. Proin pellentesque ornare leo sit amet varius. Aenean a mauris vel dui vehicula imperdiet ut vel turpis.
              <br/><br/><h5 class="text-danger">Warnings</h5><hr/>
              <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </div>
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
import ExamSessionDetail from './ExamSessionDetail.vue'
import CountDown from './CountDown.vue'
import {mapState} from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'ExamSession',
  
  created:function(){
    console.log('LIFECYCLE:: created');
    var me = this;
    this.loadExam({ExamID: me.ExamID}).then(function(){
          me.CandidateName = me.$store.state.session.CandidateName;
          me.loadQs().then(me.handleResponse);
    });
  },

  methods:{
      ...mapActions(['loadQs','loadExam']),
      getStartDateTime: function (datetime){
      var d = datetime || new Date(); // for now
      return d.getHours() + ': ' + d.getMinutes() + ':' + d.getSeconds(); 
    },
    enableDisableNavigationButtons(){
        this.NoPrevItem = this.questionCounter == 1;    
        this.NoNextItem = this.questionCounter == this.totalCount;
    },
    prevQ(){
        this.$store.commit('decrement');
        this.navigate();
    },
    nextQ(){
        this.$store.commit('increment');
        this.navigate();
    },
    navigate(){
        this.enableDisableNavigationButtons();
        this.QuestionID = this.questions[this.questionCounter-1].QuestionID;
        console.log(this.questionCounter-1)
    },
    handleResponse(){
      if(this.statusMessage){
        this.$toasted.show(this.statusMessage);
      }
      if(this.totalCount){
        this.QuestionID = this.questions[0].QuestionID;
         this.enableDisableNavigationButtons();
         this.$toasted.show('Exam started')
      }
      console.log('Session::Questions loaded:'+ JSON.stringify(this.questions));
    },
  
  },

  data(){
    return {    
      QuestionID : 0,
      ExamID: this.$route.params.ExamID,
      CandidateName: '',
      NoPrevItem : true,
      NoNextItem : true,
      //Alert: 'Please attempt the question as directed...',
      displayAlert: function(e){
          this.Alert = e;
      }
    }
  },  
  computed:{ 
    
    ...mapState([
    'questions','session','questionCounter','totalCount'
  ]),
  ...mapState({
   'statusMessage':  'apiCallStatus'
  }),

  totalTime: store=> parseInt(store.session.TimeAllowed)

  },
  components:{
    ExamSessionDetail, 
    CountDown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
