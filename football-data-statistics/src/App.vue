<template>
  <the-spinner v-if="isLoading"></the-spinner>
  <the-header :competitions="competitions"></the-header>
  <main>
    <router-view v-if="!isLoading"></router-view>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: { TheHeader },
  computed: {
    competitions() {
      return this.$store.getters["comps/competitions"];
    },
    isLoading() {
      return this.$store.getters["comps/isLoading"];
    },
  },
  beforeCreate() {
    this.$store
      .dispatch("comps/loadTierOne_Action")
      .then(() => this.$router.push("/"));
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
.loading-mask {
  display: none;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 9995;
  background-color: rgba(0, 0, 0, 0.7);
}
.loading-mask img {
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 9999;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
</style>
