<template>
  <base-card>
    <div v-if="scorers.length > 0" class="search">Search</div>
    <div class="container">
      <table-scorers></table-scorers>
    </div>
    <the-pagination v-if="scorers.length > 0"></the-pagination>
  </base-card>
</template>

<script>
import ThePagination from "../components/TopShooters/ThePagination.vue";
import TableScorers from "../components/TopShooters/TableScorers.vue";
export default {
  components: {
    ThePagination,
    TableScorers,
  },
  computed: {
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
    scorers() {
      return this.$store.getters["top/getShootersInView"];
    },
  },
  created() {
    this.$store.dispatch("top/loadTopShooters", { id: this.selectedId });
  },
};
</script>

<style scoped>
.search {
  height: 50px;
}
.container {
  height: calc(100% - 120px);
  overflow-y: auto;
  overflow-x: auto;
}
</style>
