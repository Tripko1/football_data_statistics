<template>
  <base-card>
    <div class="search-container">
      <the-search @search-value="searchValue"></the-search>
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
    <the-pagination :inputValue="inputValue"></the-pagination>
  </base-card>
</template>

<script>
import ThePagination from "../components/matches/ThePagination.vue";
import TheSearch from "../components/Search/TheSearch.vue";
import TableHeader from "../components/matches/TableHeader.vue";
import TableRow from "../components/matches/TableRow.vue";
export default {
  components: {
    TableRow,
    ThePagination,
    TheSearch,
    TableHeader,
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
    matches() {
      return this.$store.getters["match/getMatchesInView"];
    },
  },
  methods: {
    searchValue(input) {
      this.inputValue = input;
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
