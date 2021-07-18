<template>
  <base-card>
    <div class="search-container">
      <the-search @search-value="searchValue"></the-search>
    </div>
    <div class="container">
      <div class="table" v-if="scorers.length > 0">
        <scorer-header></scorer-header>
        <scorer-row
          v-for="player in scorers"
          :key="player.player.id"
          :player="player"
        ></scorer-row>
      </div>
      <div v-else>
        <scorer-header></scorer-header>
        <div class="no-data">
          Currently don't have data for scorers...
        </div>
      </div>
    </div>
    <the-pagination
      v-if="scorers.length > 0"
      :inputValue="inputValue"
    ></the-pagination>
  </base-card>
</template>

<script>
import ThePagination from "../components/TopShooters/ThePagination.vue";
import TheSearch from "../components/Search/TheSearch.vue";
import ScorerHeader from "../components/TopShooters/ScorerHeader.vue";
import ScorerRow from "../components/TopShooters/ScorerRow.vue";
export default {
  components: {
    ThePagination,
    TheSearch,
    ScorerHeader,
    ScorerRow,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  computed: {
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
    scorers() {
      return this.$store.getters["top/getShootersInView"];
    },
  },
  methods: {
    searchValue(input) {
      this.inputValue = input;
    },
  },
  created() {
    this.$store.dispatch("top/loadTopShooters", { id: this.selectedId });
  },
};
</script>

<style scoped>
.search-container {
  width: 100%;
  height: 50px;
}
.container {
  height: calc(100% - 140px);
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.table {
  padding: 5px;
  height: calc(100% - 10px);
}

.no-data {
  padding-top: 20px;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 800;
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
