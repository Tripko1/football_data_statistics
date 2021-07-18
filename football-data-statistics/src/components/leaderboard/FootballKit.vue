<template>
  <div v-if="role === 'PLAYER'">
    <div
      class="shirt"
      :style="{
        'background-color': color1.split(' ').length > 2 ? '#ccc' : color1,
      }"
    >
      <div
        class="arm-left"
        :style="{
          'background-color': color1.split(' ').length > 2 ? '#ccc' : color1,
        }"
      ></div>
      <div
        class="arm-right"
        :style="{
          'background-color': color1.split(' ').length > 2 ? '#ccc' : color1,
        }"
      ></div>
      <span
        class="number"
        :style="{
          color: color2.split(' ').length > 2 ? '#ccc' : color2,
        }"
        ><strong>{{ shirtNumber }}</strong></span
      >
    </div>
    <div class="name">{{ playerName }}</div>
  </div>
  <div v-else>
    <div
      class="shirt"
      :style="{
        'background-color': 'black',
      }"
    >
      <div
        class="arm-left"
        :style="{
          'background-color': 'black',
        }"
      ></div>
      <div
        class="arm-right"
        :style="{
          'background-color': 'black',
        }"
      ></div>
      <img :src="tie" alt="" />
    </div>
    <div class="name">{{ playerName }}</div>
  </div>
</template>

<script>
export default {
  props: ["playerName", "shirtNumber", "role", "color1", "color2"],
  data() {
    return {
      tie: require("../../assets/tie.png"),
    };
  },
};
</script>

<style scoped>
.shirt {
  width: 54px;
  height: 75px;
  position: relative;
  margin: 9px auto;
}
.arm-left {
  width: 18px;
  height: 39px;
  transform: rotate(35deg);
  position: relative;
  top: 2px;
  left: -13px;
}
.arm-right {
  width: 18px;
  height: 39px;
  transform: rotate(145deg);
  position: relative;
  top: -37px;
  left: 48px;
}
.number {
  position: relative;
  left: 1px;
  top: -60px;
}
.name {
  margin: 4px auto;
  min-width: calc(20% - 8px);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
img {
  position: relative;
  top: -75px;
}
</style>
