<template>
  <div class="card-body">
  <div class="lead">
                   {{QuestionText}}

                </div>
            
            <div class="card border-none">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <h5>{{Instruction}}</h5>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="list-group">
                        <label class="list-group-item" v-for="opt in Options" :key="opt.ID">
      <QuestionOptions :ID="opt.ID" :Title="opt.Title" :OptionsTypeID="opt.OptionsTypeID" 
       v-on:onSelection="onQuestionAttempt($event)" />
    </label>
                      
                    </div>
                </div>
                 </div>
                  </div>
            
</template>

<script>
import QuestionOptions from './QuestionOptions.vue'

export default {
  name: 'ExamQuestions',
  props: ['ID', 'QuestionText', 'Options', 'QuestionTypeID'], 
  data(){
    return {
      Instruction: ''
    }
  },
  updated(){
    this.setInstruction();
  },
  components:{
    QuestionOptions
  },
   methods:{
     setInstruction(){
       this.Instruction = this.QuestionTypeID == 2 ? 'Answer (Please select all that apply):':
       (this.QuestionTypeID == 3? 'Answer (Please enter your answer:)': 'Answer (Please select your correct option):');
     },
    onQuestionAttempt:function(selection){
        console.log('USER_RESPONSE::OptionID: ' + selection + ', QuestionID: '+ this.ID);
        this.$emit('USER_RESPONSE', {
          OptionID: selection,
          QuestionID: this.ID
          });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
