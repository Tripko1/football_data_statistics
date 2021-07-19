<template>
  <base-card>
    <div v-if="error" class="errorMessage">{{ error }}</div>
    <div v-else style="height: 100%">
      <div class="search-container">
        <div class="filter-left">
          <div class="half">Most Goals</div>
          <div class="half">
            <select-filter
              @select-value="selectedValue"
              :searchValue="inputValue"
            ></select-filter>
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
      <div class="matches">
        <div class="table" v-if="matches">
          <table-header></table-header>
          <table-row
            v-for="match in matches"
            :key="match.id"
            :match="match"
          ></table-row>
        </div>
      </div>
      <the-pagination
        :inputValue="inputValue"
        :selectValue="selectValue"
      ></the-pagination>
    </div>
  </base-card>
</template>

<script>
import ThePagination from "../components/matches/ThePagination.vue";
import TheSearch from "../components/Filters/TheSearch.vue";
import TableHeader from "../components/matches/TableHeader.vue";
import TableRow from "../components/matches/TableRow.vue";
import SelectFilter from "../components/Filters/SelectFilter.vue";
export default {
  components: {
    TableRow,
    ThePagination,
    TheSearch,
    TableHeader,
    SelectFilter,
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
    matches() {
      return this.$store.getters["match/getMatchesInView"];
    },
    allMatches() {
      return this.$store.getters["match/getAllMatches"];
    },
    selectedPage() {
      return this.$store.getters["match/getSelectedPage"];
    },
    error() {
      return this.$store.getters["match/getErrorMatches"];
    },
  },
  watch: {
    allMatches() {
      return this.$store.dispatch("match/filterMatches", {
        selectValue: this.selectValue,
        searchValue: this.inputValue,
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
    this.$store.dispatch("match/allMatches", { id: this.selectedId });
  },
};
</script>

<style scoped>
.search-container {
  width: 100%;
  height: 50px;
  display: inline-flex;
}
.matches {
  height: calc(100% - 140px);
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.table {
  padding: 5px;
  height: calc(100% - 10px);
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
