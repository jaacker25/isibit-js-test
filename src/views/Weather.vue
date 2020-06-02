<template>
  <div class="weather">
    <div id="nav">
      <router-link to="/">Return</router-link>
    </div>
    <h1>Here we have the weather items</h1>
  </div>
</template>


<script>
export default {
  name: 'Weather',
  data(){
    return{
      base_url: 'http://api.openweathermap.org/data/2.5/',
      api_key: process.env.VUE_APP_KEY_APPI
    }
  }
}
</script>

<style scoped>

</style>
