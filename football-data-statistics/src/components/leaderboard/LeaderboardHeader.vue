<template>
  <div class="table-header">
    <div class="field small-field">Position</div>
    <div class="field big-field">Club</div>
    <div class="field small-field">Played</div>
    <div class="field small-field">Won</div>
    <div class="field small-field">Drawn</div>
    <div class="field small-field">Lost</div>
    <div class="field small-field"><abbr title="Goals For">GF</abbr></div>
    <div class="field small-field"><abbr title="Goals Against">GA</abbr></div>
    <div class="field small-field">
      <abbr title="Goals Difference">GD</abbr>
    </div>
    <div class="field small-field">Points</div>
  </div>
</template>

<style scoped>
.table-header {
  width: 100%;
  height: 40px;
  background-color: #fbfbfb;
  border-radius: 12px;
  border-top: 7px solid #4ca1af;
}
.field {
  float: left;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 8px 0;
}
.small-field {
  width: calc(75% / 9);
}
.big-field {
  width: 25%;
}
</style>
