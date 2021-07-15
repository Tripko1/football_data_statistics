<template>
  <the-header :competitions="competitions"></the-header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import axios from "./axios-instance";
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: { TheHeader },
  data() {
    return {
      competitions: [],
    };
  },
  methods: {
    async loadTierOne() {
      const response = await axios
        .get("/competitions?plan=TIER_ONE")
        .then((res) => res.data);
      this.competitions = response.competitions;
    },
  },
  created() {
    this.loadTierOne();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
main {
  margin-top: 70px;
  height: calc(100% - 70px);
  background-image: url("./assets/soccer.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
