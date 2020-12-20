<template>
  <div class="examQuestions">
    <div>{{QuestionText}}</div>
    <div v-for="opt in Options" :key="opt.ID">
      <QuestionOptions :ID="opt.ID" :Title="opt.Title" :OptionsTypeID="opt.OptionsTypeID" 
       v-on:onSelection="onQuestionAttempt($event)" />
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
      
    }
  },
  components:{
    QuestionOptions
  },
   methods:{
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

.examQuestions {
 color: #4116db;
}
</style>
