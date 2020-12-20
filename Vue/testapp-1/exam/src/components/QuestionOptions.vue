<template>
  <div class="questionOptions">

      <input class="form-check-input me-3"  value=""  v-bind:type="type" v-bind:id ="id" v-bind:name="OptionsTypeID" v-on:click = "onSelection">
                            {{Title}}
  </div>
</template>

<script>
export default {
  name: 'QuestionOptions',
  props: ['ID', 'Title', 'OptionsTypeID'], 
  data(){
    return {
      id : this.ID + '_' + this.OptionsTypeID,
      type: this.OptionsTypeID == 1? 'radio':'checkbox'
    }
  },
   created:function(){
        console.log('QO::LIFECYCLE:: created:'+this.OptionsTypeID)
       
      },
        updated:function(){
        console.log('QO:: updated:'+this.OptionsTypeID)
      this.bind();

      },
   mounted:function(){
        console.log('QO::LIFECYCLE:: mounted:'+this.OptionsTypeID);
      

      },
  methods:{
    bind(){
        this.id = this.ID + '_' + this.OptionsTypeID;
        this.type = this.OptionsTypeID == 1? 'radio':'checkbox';
    },
      onSelection:function(){
      console.log('onSelection::OptionID: ' + this.ID);
        this.$emit('onSelection', this.ID);
      }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
