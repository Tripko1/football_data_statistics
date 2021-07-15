<template>
  <div>
    <ul>
      <li v-for="c in competitions" :key="c.id">
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
};
</script>

<style scoped>
div {
  position: absolute;
  top: 75px;
  left: 10px;
  width: 400px;
  background-color: white;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 15px 2px #ccc;
  box-shadow: 5px 5px 15px 2px #ccc;
}
ul {
  background-color: #fff;
  border-radius: 0 0 12px 12px;
  padding: 15px 15px 20px;
  display: grid;
  row-gap: 8px;
}

li {
  align-items: left;
  padding: 10px 30px 10px 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
    box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
  background-color: #fff;
}

li:hover {
  transform: scale(1.2);
  box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
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
  background: #4ca1af;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c3e50;
}
</style>
