<template>
  <base-card>
    <span class="back" @click="goBack">
      <img class="left_arrow" :src="leftArrow" alt="Back" />
    </span>
    <img class="crest" :src="selectedTeam.crestUrl" alt="" />
    <h1>{{ selectedTeam.name }}</h1>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      leftArrow: require("../../assets/left_arrow.gif"),
    };
  },
  computed: {
    selectedTeam() {
      return this.$store.getters["lead/getSelectedTeam"];
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  created() {
    const group = this.$route.params.group;
    const position = this.$route.params.pos;

    const selectedTable = this.$store.getters["lead/getStandings"].find(
      (stand) => {
        if (group === "1") {
          return stand;
        }
        return stand.group === group;
      }
    ).table;
    const selectedTeam = selectedTable.find(
      (team) => team.position === +position
    ).team;
    this.$store.dispatch("lead/setSelectedTeam", {
      selectedTeam: selectedTeam,
    });
  },
};
</script>

<style scoped>
.crest {
  height: 250px;
  width: 250px;
  background-color: transparent;
}
.left_arrow {
  height: 40px;
  width: 40px;
  background-color: transparent;
  border-radius: 10px;
}
.back {
  position: absolute;
  right: calc(10% + 10px);
  cursor: pointer;
}
</style>
