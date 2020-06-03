<template>
  <div class="home">
    <router-link to="/weather" class="logoHomeBackLayer">
      <div class="logoHome">
        <h1>G E T ∙ I N</h1>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style scoped>
.home {
  background: linear-gradient(
    310deg,
    rgb(50, 36, 129) 0%,
    rgba(25, 50, 255, 0.8) 40%,
    rgba(70, 80, 255, 0.5) 100%
  );
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logoHomeBackLayer {
  width: 300px;
  height: 300px;
  background: #5885f888;

  border: solid 2px rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-shadow: black 5px 5px 100px;
  transition: 0.3s ease-in;
  text-decoration: none;
}
.logoHomeBackLayer:hover {
  border: solid 2px #f1b434;
  box-shadow: black 5px 5px 90px;
}

.logoHomeBackLayer:hover h1 {
  color: #f1b434;
}

.logoHome {
  background-image: url("https://res.cloudinary.com/jaacker25/image/upload/v1591187983/ISIBIT/logo_enqeta.png");
  background-size: contain;
  opacity: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
}

h1 {
  color: white;
  opacity: 0.75;
  font-size: 1.4rem;
  font-weight: 800;

  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease-in;
}
</style>
