<template>
  <base-card v-if="selectedTeam">
    <div v-if="error" class="errorMessage">{{ error }}</div>
    <div v-else>
      <div
        class="container"
        :style="{
          'background-color': color1.split(' ').length > 2 ? 'white' : color1,
          color: color1.split(' ').length > 2 ? '#2c3e50;' : color2,
        }"
      >
        <span class="back" @click="goBack">
          <img class="left_arrow" :src="leftArrow" alt="Back" />
        </span>
        <div class="badge">
          <div class="circle">
            <img
              v-if="selectedTeam.crestUrl"
              class="crest"
              :src="selectedTeam.crestUrl"
              alt=""
            />
          </div>
        </div>
        <div class="info">
          <div class="content">
            <span>
              <h1>{{ selectedTeam.name }}</h1>
            </span>
          </div>
          <div class="content">
            <span class="left">
              <img class="smallImg" :src="stadium" alt="stadium" />
              <span class="center-left">
                <strong>{{ selectedTeam.venue }}</strong>
              </span>
            </span>
            <span class="left">
              <img class="smallImg" :src="phone" alt="stadium" />
              <span class="center-left">
                <strong>{{ selectedTeam.phone }}</strong>
              </span>
            </span>
          </div>
          <div class="content">
            <span class="left">
              <img class="smallImg" :src="web" alt="stadium" />
              <a
                class="center-left"
                :href="selectedTeam.website"
                style="textDecoration: none"
              >
                <strong>{{ selectedTeam.website }}</strong>
              </a>
            </span>
            <span class="left">
              <img class="smallImg" :src="address" alt="stadium" />
              <span class="center-left">
                <strong>{{ selectedTeam.address }}</strong>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div v-if="selectedTeam.squad.length > 0" class="players">
        <div class="player" v-for="s in selectedTeam.squad" :key="s.id">
          <router-link :to="'/player/' + s.id">
            <football-kit
              :playerName="s.name"
              :shirtNumber="s.shirtNumber"
              :role="s.role"
              :color1="color1"
              :color2="color2"
            ></football-kit>
          </router-link>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import FootballKit from "./FootballKit.vue";
export default {
  components: {
    FootballKit,
  },
  data() {
    return {
      leftArrow: require("../../assets/left_arrow.gif"),
      stadium: require("../../assets/stadium.png"),
      web: require("../../assets/website.png"),
      phone: require("../../assets/phone.png"),
      address: require("../../assets/address.png"),
    };
  },
  computed: {
    selectedTeam() {
      return this.$store.getters["lead/getSelectedTeam"];
    },
    standings() {
      return this.$store.getters["lead/getStandings"];
    },
    color1() {
      return this.$store.getters["lead/getColor1"];
    },
    color2() {
      return this.$store.getters["lead/getColor2"];
    },
    error() {
      return this.$store.getters["lead/getError"];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeCreate() {
    const teamId = this.$route.params.teamId;

    this.$store.dispatch("lead/setSelectedTeam", {
      id: teamId,
    });
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 200px;
  border-bottom: 3px solid black;
}
.circle {
  display: inline-block;
  vertical-align: middle;
  margin-right: 2.6rem;
  width: 180px;
  height: 180px;
  border-radius: 100%;
  background: #ccc;
  position: relative;
}
.crest {
  width: 70%;
  height: 70%;
  max-height: 20rem;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.left_arrow {
  height: 40px;
  width: 40px;
  background-color: transparent;
  border-radius: 10px;
}
.badge {
  float: left;
  margin: 10px;
  width: 200px;
}
.info {
  float: left;
  margin: 10px;
  width: calc(100% - 240px);
  height: calc(100% - 20px);
}
.content {
  width: 100%;
  height: 33%;
  float: left;
}
h1 {
  float: left;
}

.left {
  float: left;
  width: 50%;
}

.back {
  position: absolute;
  top: 100px;
  right: calc(10% + 20px);
  cursor: pointer;
}
.smallImg {
  float: left;
  height: 40px;
  width: 40px;
}
.center-left {
  display: flex;
  padding: 15px 0 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
.players {
  width: 100%;
  height: calc(100% - 220px);
  overflow: auto;
}
.player {
  width: 20%;
  float: left;
}
.errorMessage {
  padding-top: 40px;
  color: #2c3e50;
  font-size: 30px;
}
/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(96, 96, 96);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(96, 96, 96) rgb(169, 169, 169);
}
</style>
