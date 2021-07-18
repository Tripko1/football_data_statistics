<template>
  <div>
    <ul>
      <li
        v-for="c in competitions"
        :key="c.id"
        :class="className(c.id)"
        @click="selectCompetition(c.id)"
      >
        <span
          ><strong>{{ c.area.name }} {{ c.name }}</strong></span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["competitions"],
  computed: {
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
  },
  methods: {
    className(id) {
      if (id === this.selectedId) {
        return "listItem active";
      }
      return "listItem";
    },
    selectCompetition(selectedId) {
      this.$store
        .dispatch("comps/setCompetition", {
          id: selectedId,
          path: this.$route.fullPath,
        })
        .then(() => {
          if (this.$route.fullPath === "/leaderboard") {
            return this.$router.push("/leaderboard");
          } else if (this.$route.fullPath === "/matches") {
            return this.$router.push("/matches");
          } else if (this.$route.fullPath === "/topshooters") {
            return this.$router.push("/topshooters");
          } else {
            return this.$router.push("/leaderboard");
          }
        });
    },
  },
};
</script>

<style scoped>
div {
  position: absolute;
  top: 85px;
  left: 10px;
  width: 400px;
  background-color: white;
  max-height: 640px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 15px 2px #ccc;
  box-shadow: 5px 5px 15px 2px #ccc;
  z-index: 1;
}
ul {
  background-color: #fff;
  border-radius: 0 0 12px 12px;
  padding: 15px 20px 20px;
  display: grid;
  row-gap: 8px;
}

.listItem {
  align-items: center;
  padding: 10px 30px 10px 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
    box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
  background-color: #fff;
}

.listItem:hover {
  transform: scale(1.1);
  box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
}

.active {
  border: 3px solid black;
  background-color: #4ca1af;
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
  background: rgb(169, 169, 169);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(96, 96, 96);
}
</style>
