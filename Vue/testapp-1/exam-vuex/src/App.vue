<template>
  <div id="app">
        <!-- <font-awesome-icon icon="fa-backward" />
<font-awesome-icon :icon="['fas', 'fa-backward']" />
<font-awesome-icon :icon="['fas', 'user-secret']" /> -->


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

.border-none
{
    border-left: none;
    border-right: none;
    border-radius: 0;
}
.page-item .page-link{
    color: #393f44;
}
.list-group-item{
    cursor: pointer;
}
</style>
