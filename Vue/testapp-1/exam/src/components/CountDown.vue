<template>

  <span>{{Minutes | countdown(Elm)}}</span>
  
</template>

<script>

export default {
  name: 'CountDown',
  props: {
    Minutes : Number
  }, 
  data(){
    return {
      Elm: null
    }
  },
  mounted() {
    this.Elm = this.$el;
  }
}
</script>


