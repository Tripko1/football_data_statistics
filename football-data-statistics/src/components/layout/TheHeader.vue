<template>
  <header>
    <div class="hamburger">
      <img :src="hamburger" alt="" @click="openCloseMenu" />
    </div>
    <div class="container">
      <div class="title">
        {{ title }}
      </div>
      <div class="navigation">
        <nav>
          <ul>
            <li>
              <router-link to="/leaderboard">LEADERBOARD</router-link>
            </li>
            <li>
              <router-link to="/matches">MATCHES</router-link>
            </li>
            <li>
              <router-link to="/topshooters">TOP SHOOTER</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  <competations-list
    v-if="menuIsOpen"
    :competitions="competitions"
  ></competations-list>
</template>

<script>
import CompetationsList from "./CompetationsList.vue";
export default {
  props: ["competitions"],
  components: {
    CompetationsList,
  },
  data() {
    return {
      hamburger: require("../../assets/menu.svg"),
    };
  },
  computed: {
    title() {
      return this.$store.getters["comps/selectedName"];
    },
    menuIsOpen() {
      return this.$store.getters["comps/menuIsOpen"];
    },
  },
  methods: {
    openCloseMenu() {
      return this.$store.dispatch("comps/openCloseModal");
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  background: linear-gradient(to right, #2c3e50, #4ca1af);
  -webkit-box-shadow: 0px 5px 5px 1px #000000;
  box-shadow: 0px 5px 5px 1px #000000;
}
.hamburger {
  float: left;
  padding-left: 15px;
  width: 50px;
  cursor: pointer;
}
img {
  padding-top: 15px;
  width: 50px;
  height: 50px;
  color: white;
}
img:hover {
  transform: scale(1.1);
}
.container {
  float: left;
  padding-left: 15px;
  height: 70px;
  width: calc(100% - 80px);
}
.title {
  color: black;
  float: left;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-top: 5px;
  height: 30px;
  width: calc(100% - 70px);
  text-align: center;
}
.navigation {
  position: absolute;
  top: 20px;
  height: 50px;
  width: calc(100% - 70px);
}
ul {
  list-style: none;
  margin: 15px 0 0 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}
li:hover {
  transform: scale(1.1);
}
a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: wheat;
  border-color: wheat;
  border-radius: 10px;
}
</style>
