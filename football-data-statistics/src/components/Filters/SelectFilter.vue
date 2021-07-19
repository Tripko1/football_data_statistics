<template>
  <select name="filter" id="filter" v-model="selectValue">
    <option value="-1" selected="selected">All</option>
    <option value="0">Played</option>
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    <option value="6">6+</option>
    <option value="7">7+</option>
  </select>
</template>

<script>
export default {
  props: ["searchValue"],
  data() {
    return {
      selectValue: "",
    };
  },
  emits: ["select-value"],
  watch: {
    selectValue() {
      this.$emit("select-value", this.selectValue);
      return this.$store.dispatch("match/filterMatches", {
        selectValue: this.selectValue,
        searchValue: this.searchValue,
      });
    },
  },
};
</script>

<style scoped>
select {
  padding: 1px 3px;
  border: 3px solid #2c3e50;
  border-radius: 5px;
}

option {
  padding: 0 3px;
  text-align: center;
}
</style>
