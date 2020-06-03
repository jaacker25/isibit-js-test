<template src="./index.html"></template>
<style scoped src="./style.css" ></style>


<script>
//import List from '../components/List.vue';
export default {
  name: "Weather",
  components: {
    //    List
  },
  data() {
    const today = new Date();
    return {
      base_url: "http://api.openweathermap.org/data/2.5/",
      base_url_icon: "http://openweathermap.org/img/wn/",
      api_key: process.env.VUE_APP_KEY_APPI,
      currentDate: today.toDateString(),
      homeCityInput: "",
      destinationCityInput: "",
      showHomeCityName: false,
      showDestinationCityName: false,
      homeCityCoord: {},
      destinationCityCoord: {},
      homeCityHourly: [],
      destinationCityHourly: [],
      error: ""
    };
  },
  methods: {
    showAlert: function() {
      setTimeout(() => {
        this.error = "";
      }, 3000);
      return this.error;
    },
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
    homeCityEvent: function() {
      if (parseInt(this.homeCityInput).toString() === this.homeCityInput) {
        this.error = "City not found, please type a new one";
        this.homeCityInput = "";
        return;
      } else {
        this.error = "";
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
          .then(this.giveMeHomeCityData);
      }
    },
    destinationCityEvent: function() {
      if (parseInt(this.destinationCityInput).toString() === this.destinationCityInput) {
        this.error = "City not found, please type a new one";
        this.destinationCityInput = "";
        return;
      } else {
        this.error = "";
        fetch(`${this.base_url}weather?q=${this.destinationCityInput}&appid=${this.api_key}`)
          .then(res => {
            if (!res.ok) {
              this.error = "City not found, please type a new one";
              this.destinationCityInput = "";
              return;
            } else {
              return res.json();
            }
          })
          .then(this.giveMeDestinationCityData);
      }
    },
    clearHomeCityEvent: function() {
      this.homeCityInput = "";
      this.showHomeCityName = false;
    },
    clearDestinationCityEvent: function() {
      this.destinationCityInput = "";
      this.showDestinationCityName = false;
    },
    giveMeHomeCityData: function(data) {
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
    giveMeDestinationCityData: function(data) {
      if (this.error == "") {
        this.destinationCityCoord = data.coord;

        fetch(
          `${this.base_url}onecall?lat=${this.destinationCityCoord.lat}&lon=${this.destinationCityCoord.lon}&exclude=minutely,daily&appid=${this.api_key}`
        )
          .then(res => {
            return res.json();
          })
          .then(this.giveMeDestinationCityHourly);

        this.showDestinationCityName = true;
        this.error = "";
      }
    },
    giveMeHomeCityHourly: function(data) {
      this.homeCityHourly = [...data.hourly].slice(0, 12);
    },
    giveMeDestinationCityHourly: function(data) {
      this.destinationCityHourly = [...data.hourly].slice(0, 12);
    }
  }
};
</script>



