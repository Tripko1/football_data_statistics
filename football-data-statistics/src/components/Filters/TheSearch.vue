<template>
  <div class="search">
    <img :src="search" alt="" />
    <input
      id="search-input"
      type="text"
      placeholder="Search"
      :onkeyup="getValue"
      v-model="searchValue"
    />
  </div>
</template>

<script>
export default {
  props: ["selectValue"],
  data() {
    return {
      search: require("../../assets/search.png"),
      searchValue: "",
    };
  },
  emits: ["search-value"],
  methods: {
    getValue() {
      this.$emit("search-value", this.searchValue);
      if (this.$route.fullPath === "/matches") {
        this.$store.dispatch("match/filterMatches", {
          searchValue: this.searchValue,
          selectValue: this.selectValue,
        });
      } else if (this.$route.fullPath === "/topshooters") {
        this.$store.dispatch("top/filterScorers", {
          value: this.searchValue,
          // selectValue: this.selectValue,
        });
      }
    },
  },
};
</script>

<style scoped>
.search {
  height: 50px;
  width: 434px;
  margin: 0 auto;
}
.search input {
  display: block;
  width: 400px;
  font-size: 14px;
  background-color: white;
  height: 34px;
  margin: 8px 0;
  border-radius: 30px;
  outline: none;
  border: 2px solid #2c3e50;
  padding: 0px 15px;
  color: #2c3e50;
}
.search input::placeholder {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 500px;
}
.search img {
  position: absolute;
  /* top: 9px; */
  width: 30px;
  height: 30px;
  font-size: 20px;
  margin-top: 10px;
  right: calc(50% - 196px);
}
</style>
