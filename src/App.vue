<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Muli", sans-serif;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar:horizontal {
  height: 5px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #4189d3;
  border-radius: 10px;
}

::-webkit-scrollbar-track-piece{
background: #9dd2ee;
border-radius: 25px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #48a144;
}
</style>
