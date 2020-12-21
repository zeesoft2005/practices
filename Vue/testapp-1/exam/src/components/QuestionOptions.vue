<template>
  <div class="questionOptions">

      <input  v-if="IsInputType" class="form-check-input ml-auto"  value=""  v-bind:type="type" v-bind:id ="id" v-bind:name="OptionsTypeID" v-on:click = "onSelection">
      <span  v-if="IsInputType" class="pl-4">{{Title}}</span>
      <!--textarea id="editor1" v-if="!IsInputType" ></!--textarea-->
      <ckeditor v-if="!IsInputType"  :config="editorConfig"></ckeditor>


  </div>
</template>

<script>
export default {
  name: 'QuestionOptions',
  props: ['ID', 'Title', 'OptionsTypeID'], 
  data(){
    return {
      id : this.ID + '_' + this.OptionsTypeID,
      type: this.OptionsTypeID == 1? 'radio':'checkbox',
      IsInputType : this.OptionsTypeID < 3,
      editorConfig:{//https://ckeditor.com/docs/ckeditor4/latest/guide/dev_vue.html#basic-usage
        // toolbar: [ [ 'Bold' ] ]

      }
    }
    },
    updated:function(){
      console.log('QO:: updated:'+this.OptionsTypeID)
      this.bind();

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
