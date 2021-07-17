<template>
  <div class="content">
    <div>
      <img :src="image" :alt="title" :title="title" />
    </div>
    <span>
      <h3>{{ value }}</h3>
    </span>
  </div>
</template>

<script>
export default {
  props: ["image", "value", "title"],
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 60px;
}
div {
  float: left;
  height: 50px;
  width: 50px;
}
img {
  height: 40px;
  width: 40px;
  padding: 5px;
}
span {
  float: left;
  padding-left: 10px;
}
</style>
