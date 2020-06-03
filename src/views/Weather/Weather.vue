<template src="./index.html"></template>
<style scoped src="./style.css"></style>

<script>
export default {
  name: "Weather",
  data() {
    const today = new Date();
    return {
      base_url: "https://api.openweathermap.org/data/2.5/", //De aqui se haran los dos llamados de la API
      base_url_icon: "https://openweathermap.org/img/wn/", //De aqui obtenemos los iconos asociados a los resultados
      api_key: process.env.VUE_APP_KEY_APPI, //Nuestra llave secreta para la API
      currentDate: today.toDateString(),
      homeCityInput: "", //Es la entrada de texto de nuestros input
      destinationCityInput: "",
      showHomeCityName: false, //Nos permite desplegar los resultados si la busqueda es aceptada
      showDestinationCityName: false,
      homeCityCoord: {}, //Guardamos los resultados de coordenadas del primer llamado hecho a la API
      destinationCityCoord: {},
      homeCityHourly: [], //Guardamos el paquete de datos que generamos de la segunda llamada a la API y de donde vamos a sacar los dato para mostrar
      destinationCityHourly: [],
      error: "" //Aqui guardamos los mensajes de aviso, cuando la entrada de busqueda en los inputs es incorrecta
    };
  },
  methods: {
    //Para mostrar el mensaje de error por 3 segundos
    showAlert: function() {
      setTimeout(() => {
        this.error = "";
      }, 3000);
      return this.error;
    }, //Para convertir los datos de temperatura de la API a grados C
    kelvinToCelcius: function(tempK) {
      let tempC = tempK - 273.15;
      tempC = Math.floor(tempC);
      return tempC;
    }, //La API regresa la fecha en formato Timestamp y de aqui sacamos las horas en formato: HH:MM
    msToLocalTime: function(_timeMs) {
      let timeMs = _timeMs;
      timeMs *= 1000;
      let timeHrs_Hrs = new Date(timeMs).getHours();
      let timeHrs_Min = new Date(timeMs).getMinutes();

      timeHrs_Hrs = timeHrs_Hrs < 10 ? "0" + timeHrs_Hrs : timeHrs_Hrs;
      timeHrs_Min = timeHrs_Min < 10 ? "0" + timeHrs_Min : timeHrs_Min;

      return `${timeHrs_Hrs}:${timeHrs_Min}`;
    }, //Aqui llegamos cuando damos 'enter' en el input despues de haber escrito la busqueda para Home City
    homeCityEvent: function() {
      //Aqui corroboramos que la entrada no sea numerica, en caso de serlo mandamos error
      if (parseInt(this.homeCityInput).toString() === this.homeCityInput) {
        this.error = "City not found, please type a new one";
        this.homeCityInput = "";
        return;
      } else {
        this.error = "";
        //Si la entrada de texto es texto, llamamos a la API para obtener las coordenadas
        fetch(`${this.base_url}weather?q=${this.homeCityInput}&appid=${this.api_key}`)
          .then(res => {
            if (!res.ok) {
              //En caso de que no encontremos el nombre, generamos un aviso
              this.error = "City not found, please type a new one";
              this.homeCityInput = "";
              return;
            } else {
              return res.json();
            }
          })
          //Si todo sale bien llamamos esta funcion para la segunda llamada de la API y guardar todo el paquete de datos
          .then(this.giveMeHomeCityData);
      }
    }, //Aqui llegamos cuando damos 'enter' en el input despues de haber escrito la busqueda para Destination City
    destinationCityEvent: function() {
      //Aqui corroboramos que la entrada no sea numerica, en caso de serlo mandamos error
      if (parseInt(this.destinationCityInput).toString() === this.destinationCityInput) {
        this.error = "City not found, please type a new one";
        this.destinationCityInput = "";
        return;
      } else {
        this.error = "";
        //Si la entrada de texto es texto, llamamos a la API para obtener las coordenadas
        fetch(`${this.base_url}weather?q=${this.destinationCityInput}&appid=${this.api_key}`)
          .then(res => {
            if (!res.ok) {
              //En caso de que no encontremos el nombre, generamos un aviso
              this.error = "City not found, please type a new one";
              this.destinationCityInput = "";
              return;
            } else {
              return res.json();
            }
          })
          //Si todo sale bien llamamos esta funcion para la segunda llamada de la API y guardar todo el paquete de datos
          .then(this.giveMeDestinationCityData);
      }
    },
    //Cuando hacemos nuevas busquedas, mandamos llamar estas fucniones para resetear todo
    clearHomeCityEvent: function() {
      this.homeCityInput = "";
      this.showHomeCityName = false;
    },
    clearDestinationCityEvent: function() {
      this.destinationCityInput = "";
      this.showDestinationCityName = false;
    },
    //De aqui ya sacamos los datos que vamos a mostrar (algunos requieren aun un proceso extra antes de imprimirlos)
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
    //De aqui ya sacamos los datos que vamos a mostrar (algunos requieren aun un proceso extra antes de imprimirlos)
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
    //Solo permitimos que se muestren 12 items por cada busqueda
    giveMeHomeCityHourly: function(data) {
      this.homeCityHourly = [...data.hourly].slice(0, 12);
    },
    giveMeDestinationCityHourly: function(data) {
      this.destinationCityHourly = [...data.hourly].slice(0, 12);
    }
  }
};
</script>
