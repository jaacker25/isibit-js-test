<template>
  <div class="weather">
    <div class="weatherIntern">
      <div class="titlesAndSearch">
        <h1>WELCOME TO WEATHER APP</h1>
        <h5>by: Jorge Aguilar</h5>
        <div class="InputBox">
          <h3 class="currentDateTitle">Current Date</h3>
          <h2 class="currentDateData">{{ currentDate }}</h2>
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control searcher"
              placeholder="HOME CITY"
              aria-label="homeCity"
              aria-describedby="addon-wrapping"
              v-model="homeCityInput"
              @keypress.enter="homeCityEvent"
              @click="clearHomeCityEvent"
            />
          </div>

          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control searcher"
              placeholder="DESTINATION CITY"
              aria-label="homeCity"
              aria-describedby="addon-wrapping"
              v-model="destinationCityInput"
              @keypress.enter="destinationCityEvent"
              @click="clearDestinationCityEvent"
            />
          </div>
        </div>
      </div>

      <div class="data">
        <div v-if="showHomeCityName == true" class="homeCityData">
          <h4 class="cityName">{{ homeCityInput }}</h4>
          <div v-for="x in 12" v-bind:key="x" class="forecastDiv">
            <img
              src="https://res.cloudinary.com/jaacker25/image/upload/v1591144021/ISIBIT/pngocean.com_1_nydhho.png"
              alt="temp"
              class="forecastImg"
            />
            <div class="forecastData">
              <h6 class="forecastDataTime">18:00 hrs</h6>
              <h6 class="forecastDataTemp">Temp: <b>19°C</b></h6>
              <h6 class="forecastDataRH">RH: <b>36%</b></h6>
              <h6 class="forecastDataDescription">Scattered Clouds</h6>
            </div>
          </div>
        </div>
        <div v-if="showDestinationCityName == true" class="destinationCityData">
          <h4 class="cityName">
            {{ destinationCityInput }}
          </h4>
          <div v-for="x in 12" v-bind:key="x" class="forecastDiv">
            <img
              src="https://res.cloudinary.com/jaacker25/image/upload/v1591144021/ISIBIT/pngocean.com_1_nydhho.png"
              alt="temp"
              class="forecastImg"
            />
            <div class="forecastData">
              <h6 class="forecastDataTime">18:00 hrs</h6>
              <h6 class="forecastDataTemp">Temp: <b>19°C</b></h6>
              <h6 class="forecastDataRH">RH: <b>36%</b></h6>
              <h6 class="forecastDataDescription">Scattered Clouds</h6>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/">
        <button type="button" class="btn btn-outline-success">RETURN</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    const today = new Date();
    return {
      base_url: "http://api.openweathermap.org/data/2.5/",
      api_key: process.env.VUE_APP_KEY_APPI,
      currentDate: today.toDateString(),
      homeCityInput: "",
      destinationCityInput: "",
      showDestinationCityName: false,
      showHomeCityName: false
    };
  },
  methods: {
    destinationCityEvent: function() {
      this.showDestinationCityName = true;
    },
    clearDestinationCityEvent: function() {
      this.destinationCityInput = "";
      this.showDestinationCityName = false;
    },
    homeCityEvent: function() {
      this.showHomeCityName = true;
    },
    clearHomeCityEvent: function() {
      this.homeCityInput = "";
      this.showHomeCityName = false;
    }
  }
};
</script>

<style scoped>
.weather {
  background-image: url("https://res.cloudinary.com/jaacker25/image/upload/v1591133456/ISIBIT/background_d8i3hf.jpg");
  height: auto;
  min-height: 100vh;
  width: auto;
  background-size: cover;

  margin: 0;
  padding: 0;
}

.weatherIntern {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 25%, transparent 75%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.titlesAndSearch {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.titlesAndSearch h1 {
  margin-top: 25px;
  text-align: center;
  letter-spacing: 1.5vw;
  font-size: 3vw;
  font-weight: 900;
  text-shadow: 0.5vw 0.7vw 10px;
}
.titlesAndSearch h5 {
  margin-top: 8px;
  margin-bottom: 35px;
  text-align: center;
  letter-spacing: 1vw;
  font-size: 2vw;
  font-weight: 400;
  text-shadow: 0.5vw 0.7vw 10px;
}

.InputBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 2px white;
  border-radius: 15px;
  padding: 15px;
  padding-top: 0;
  background: #42ad0438;
}

.searcher {
  margin: 8px;
  opacity: 0.6;
}
.searcher:hover {
  opacity: 0.9;
}

.input-group {
  width: 300px;
}

.currentDateTitle,
.currentDateData {
  margin-top: 18px;
  color: white;
  letter-spacing: 2px;
  font-weight: 900;
  opacity: 0.9;
}
.currentDateData {
  margin-top: 0;
}

.data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: white;
  opacity: 0.7;
}

.homeCityData,
.destinationCityData {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cityName {
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0.5vw 0.5vw 3.5px black;
  opacity: 0.9;
  margin-bottom: 25px;
  margin-top: 25px;
  text-transform: uppercase;
  letter-spacing: 8px;
  text-align: center;
  font-size: 2.5vw;
}
@media screen and (max-width:600px) {
  .cityName {
    font-size: 5vw;
  }
}
@media screen and (max-width:850px) and (min-width:601px) {
    .cityName {
    font-size: 3.5vw;
  }
}

.forecastDiv {
  margin-bottom: 18px;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid 2px white;
  border-radius: 15px;
  background: #06368288;
}
.forecastData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.forecastDataTime{
  letter-spacing: 2px;
  padding-bottom: 3px;
  font-weight: 600;
}

.forecastDataTemp, .forecastDataRH{
  padding-bottom: 2px;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.forecastDataDescription {
  padding-top: 1px;
  font-size: 0.8rem;
}



.forecastData h6 {
  margin: 0;
  line-height: 16px;
}

button {
  border-radius: 15px;
  padding: 10px 20px;
  bottom: 25px;
  margin-bottom: 25px;
  margin-top: 50px;
}
</style>
