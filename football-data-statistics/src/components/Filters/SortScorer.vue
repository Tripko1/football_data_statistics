<template>
  <select name="sort" id="sort" v-model="selectValue">
    <option value="0">Descending </option>
    <option value="1">Ascending</option>
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
      return this.$store.dispatch("top/filterScorers", {
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
