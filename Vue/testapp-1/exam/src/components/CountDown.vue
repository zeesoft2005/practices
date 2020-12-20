<template>

  <span>{{Minutes | countdown(Elm)}}</span>
  
</template>

<script>

export default {
  name: 'CountDown',
  props: ['Minutes'], 
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


