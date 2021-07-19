<template>
  <div class="pagination">
    <div class="item" @click="decrementStartPosition">&laquo;</div>
    <div
      v-for="pageNum of totalPages"
      :key="pageNum.value"
      :class="getClass(pageNum.value)"
      @click="selectPage(pageNum.value)"
    >
      {{ pageNum.value }}
    </div>
    <div class="item" @click="incrementStartPosition">&raquo;</div>
  </div>
</template>

<script>
export default {
  props: ["inputValue", "selectValue"],
  computed: {
    totalPages() {
      return this.$store.getters["match/getTotalPages"];
    },
    selectedPage() {
      return this.$store.getters["match/getSelectedPage"];
    },
  },
  methods: {
    incrementStartPosition() {
      this.$store.dispatch("match/increment", { value: 1 });
    },
    decrementStartPosition() {
      this.$store.dispatch("match/decrement", { value: 1 });
    },
    selectPage(value) {
      this.$store.dispatch("match/selectPage", {
        value: value,
        searchValue: this.inputValue,
        selectValue: this.selectValue,
      });
    },
    getClass(num) {
      if (num === this.selectedPage) {
        return "item active";
      }
      return "item";
    },
  },
};
</script>

<style scoped>
.pagination {
  display: inline-block;
  height: 40px;
  margin: 10px;
}
.item {
  color: black;
  float: left;
  height: 20px;
  width: 20px;
  padding: 8px 12px;
  margin: 0 3px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
}
.item:hover {
  background-color: #4ca1af;
}
.active {
  background-color: #2c3e50;
}
</style>
