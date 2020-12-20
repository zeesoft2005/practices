<template>
  <div id="app">
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <ExamSession :IsInProgress = 'true'/> -->
  </div>
</template>

<script>
//import ExamSession from './components/ExamSession.vue'

export default {
  name: 'App',
  components: {
    //ExamSession
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
