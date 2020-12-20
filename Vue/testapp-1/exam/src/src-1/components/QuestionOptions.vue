<template>
  <div class="questionOptions">
    
     <label v-bind:for="id"> {{Title}}</label>
     <input v-bind:type="type" v-bind:id ="id" v-bind:name="OptionsTypeID" v-on:click = "onSelection">
    
  </div>
</template>

<script>
export default {
  name: 'QuestionOptions',
  props: ['ID', 'Title', 'OptionsTypeID'], 
  data(){
    return {
      id: this.ID + '_' + this.OptionsTypeID,
      type: this.OptionsTypeID == 1? 'radio':'checkbox'
    }
  },
  methods:{
      onSelection:function(){
      console.log('onSelection::OptionID: ' + this.ID);
        this.$emit('onSelection', this.ID);
      }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.questionOptions {
 color: #4116db;
}
</style>
