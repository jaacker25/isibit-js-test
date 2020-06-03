<template>
  <div v-if="cityData.showCityName == true" class="CityData">
    <h4 class="cityName">{{ cityData.cityInput }}</h4>
    <div v-for="item in cityHourly" v-bind:key="item.dt" class="forecastDiv">
      <img
        src="https://res.cloudinary.com/jaacker25/image/upload/v1591144021/ISIBIT/pngocean.com_1_nydhho.png"
        alt="temp"
        class="forecastImg"
      />
      <div class="forecastData">
        <h6 class="forecastDataTime">{{ msToLocalTime(item.dt) }} hrs</h6>
        <h6 class="forecastDataTemp">
          Temp: <b>{{ kelvinToCelcius(item.temp) }}°C</b>
        </h6>
        <h6 class="forecastDataRH">
          RH: <b>{{ item.humidity }}%</b>
        </h6>
        <h6 class="forecastDataDescription">{{ item.weather[0].description }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props:{
  cityData: Object
  },
  data() {
    return {
      base_url: "http://api.openweathermap.org/data/2.5/",
      api_key: process.env.VUE_APP_KEY_APPI,
      cityInput: "",
      showDestinationCityName: false,
      homeCityCoord: {},
      homeCityHourly: []
    };
  },
  methods:{
    kelvinToCelcius: function(tempK) {
      let tempC = tempK - 273.15;
      tempC = Math.floor(tempC);
      return tempC;
    },
    msToLocalTime: function(_timeMs) {
      let timeMs = _timeMs;
      timeMs *= 1000;
      let timeHrs_Hrs = new Date(timeMs).getHours();
      let timeHrs_Min = new Date(timeMs).getMinutes();

      timeHrs_Hrs = timeHrs_Hrs < 10 ? "0" + timeHrs_Hrs : timeHrs_Hrs;
      timeHrs_Min = timeHrs_Min < 10 ? "0" + timeHrs_Min : timeHrs_Min;

      return `${timeHrs_Hrs}:${timeHrs_Min}`;
    },
    cityEvent: function() {
      if (parseInt(this.cityInput).toString() === this.cityInput) {
        this.error = "City not found, please type a new one";
        this.cityInput = "";
        return;
      } else {
        this.homeCityError = "";
        fetch(`${this.base_url}weather?q=${this.homeCityInput}&appid=${this.api_key}`)
          .then(res => {
            if (!res.ok) {
              this.error = "City not found, please type a new one";
              this.homeCityInput = "";
              return;
            } else {
              return res.json();
            }
          })
          .then(this.giveMeHomeCityCoords);
      }
    },

    giveMeHomeCityCoords: function(data) {
      if (this.error == "") {
        this.homeCityCoord = data.coord;

        fetch(
          `${this.base_url}onecall?lat=${this.homeCityCoord.lat}&lon=${this.homeCityCoord.lon}&exclude=minutely,daily&appid=${this.api_key}`
        )
          .then(res => {
            return res.json();
          })
          .then(this.giveMeHomeCityHourly);

        this.showHomeCityName = true;
        this.error = "";
      }
    },
    giveMeHomeCityHourly: function(data) {
      this.homeCityHourly = [...data.hourly].slice(0, 12);
      console.log(this.homeCityHourly);
    }
  }
};
</script>


<style scoped>


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
@media screen and (max-width: 600px) {
  .cityName {
    font-size: 5vw;
  }
}
@media screen and (max-width: 850px) and (min-width: 601px) {
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
.forecastDataTime {
  letter-spacing: 2px;
  padding-bottom: 3px;
  font-weight: 600;
}

.forecastDataTemp,
.forecastDataRH {
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

</style>
