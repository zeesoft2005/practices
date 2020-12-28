<template>
  <div class="examHome">
  <span>{{Message}}, {{StudentName}}</span>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: ['Message'], 
  data(){
    return {
      StudentName: null
    }
  },
  mounted() {
    this.StudentName = 'Zeeshan';//assign after login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.countDownType {
 color: #4116db;
}
</style>
