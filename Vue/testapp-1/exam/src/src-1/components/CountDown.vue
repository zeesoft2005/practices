<template>
  <div class="countDownType">
  <span>{{Minutes | countdown(Elm)}}</span>
  </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.countDownType {
 color: #4116db;
}
</style>
