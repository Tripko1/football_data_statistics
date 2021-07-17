<template>
  <base-card v-if="selectedPlayer">
    <span class="back" @click="goBack">
      <img class="left_arrow" :src="leftArrow" alt="Back" />
    </span>
    <div class="container">
      <the-row
        :image="name"
        :value="selectedPlayer.name"
        title="name"
      ></the-row>
      <the-row
        :image="country"
        :value="selectedPlayer.countryOfBirth"
        title="country of birth"
      ></the-row>
      <the-row
        :image="calendar"
        :value="selectedPlayer.dateOfBirth"
        title="date of birth"
      >
      </the-row>
      <the-row
        :image="passport"
        :value="selectedPlayer.nationality"
        title="nationality"
      ></the-row>
      <the-row
        :image="position"
        :value="selectedPlayer.position"
        title="postion"
      ></the-row>
    </div>
  </base-card>
</template>

<script>
import TheRow from "./TheRow.vue";
export default {
  components: {
    TheRow,
  },
  data() {
    return {
      position: require("../../assets/position.png"),
      name: require("../../assets/name.png"),
      passport: require("../../assets/passport.png"),
      calendar: require("../../assets/calendar.png"),
      country: require("../../assets/country.png"),
      leftArrow: require("../../assets/left_arrow.gif"),
    };
  },
  computed: {
    selectedPlayer() {
      return this.$store.getters["top/getSelectedPlayer"];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeCreate() {
    const playerId = this.$route.params.playerId;

    this.$store.dispatch("top/setSelectedPlayer", {
      id: playerId,
    });
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 60px);
}
.back {
  position: absolute;
  top: 100px;
  right: calc(10% + 10px);
  cursor: pointer;
}
.left_arrow {
  height: 40px;
  width: 40px;
  background-color: transparent;
  border-radius: 10px;
}
</style>
