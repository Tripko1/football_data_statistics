<template>
  <base-card>
    <div class="search-container">
      <div class="filter-left">
        <div class="half">Sort Scorer</div>
        <div class="half">
          <sort-scorer
            @select-value="selectedValue"
            :searchValue="inputValue"
          ></sort-scorer>
        </div>
      </div>
      <the-search
        @search-value="searchValue"
        :selectValue="selectValue"
      ></the-search>
      <div class="filter-right">
        <div class="half"></div>
        <div class="half"></div>
      </div>
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
      :searchValue="inputValue"
      :selectValue="selectValue"
    ></the-pagination>
  </base-card>
</template>

<script>
import ThePagination from "../components/TopShooters/ThePagination.vue";
import TheSearch from "../components/Filters/TheSearch.vue";
import ScorerHeader from "../components/TopShooters/ScorerHeader.vue";
import ScorerRow from "../components/TopShooters/ScorerRow.vue";
import SortScorer from "../components/Filters/SortScorer.vue";
export default {
  components: {
    ThePagination,
    TheSearch,
    ScorerHeader,
    ScorerRow,
    SortScorer,
  },
  data() {
    return {
      inputValue: "",
      selectValue: "",
    };
  },
  computed: {
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
    scorers() {
      return this.$store.getters["top/getShootersInView"];
    },
    topShooters() {
      return this.$store.getters["top/getTopShooters"];
    },
  },
  watch: {
    topShooters() {
      this.$store.dispatch("top/filterScorers", {
        searchValue: this.inputValue,
        selectValue: this.selectValue,
      });
    },
  },
  methods: {
    searchValue(input) {
      this.inputValue = input;
    },
    selectedValue(value) {
      this.selectValue = value;
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
  display: inline-flex;
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

.filter-left {
  float: left;
  width: 150px;
  min-width: 50px;
  height: 50px;
  background-color: transparent;
}

.filter-right {
  float: right;
  width: 150px;
  min-width: 50px;
  height: 50px;
  background-color: transparent;
}

.half {
  width: 100%;
  height: 25px;
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
