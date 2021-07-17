<template>
  <base-card v-if="selectedTeam">
    <div class="container" :style="{ 'background-color': color }">
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
              {{ selectedTeam.venue }}
            </span>
          </span>
          <span class="left">
            <img class="smallImg" :src="phone" alt="stadium" />
            <span class="center-left">
              {{ selectedTeam.phone }}
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
              {{ selectedTeam.website }}
            </a>
          </span>
          <span class="left">
            <img class="smallImg" :src="address" alt="stadium" />
            <span class="center-left">
              {{ selectedTeam.address }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
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
    color() {
      return this.$store.getters["lead/getColor"];
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
  right: calc(10% + 10px);
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

  color: #2c3e50;
  text-decoration: none;
}
</style>
