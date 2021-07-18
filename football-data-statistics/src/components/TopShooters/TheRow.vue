<template>
  <div class="content">
    <div class="badge">
      <img :src="image" :alt="title" :title="title" />
      <span>{{ ali }}</span>
    </div>
    <div class="description">
      <h3>{{ value }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "value", "title", "ali"],
};
</script>

<style scoped>
.content {
  float: left;
  width: 100%;
  height: 20%;
}
.badge {
  float: left;
  height: 100%;
  width: 30%;
  background-color: #4ca1af;
}
img {
  height: 40px;
  width: 40px;
  padding: 5px;
}
span {
  position: relative;
  left: 10px;
  bottom: 20px;
  font-weight: 700;
}
.description {
  width: 70%;
}
</style>
