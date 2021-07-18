<template>
  <div class="table-header">
    <div class="field small-field">Matchday</div>
    <div class="field big-field">Home Team</div>
    <div class="field small-field">Result</div>
    <div class="field big-field">Away Team</div>
    <div class="field small-field">Date</div>
  </div>
</template>

<style scoped>
.table-header {
  width: 100%;
  height: calc((100% / 16) - 10px);
  min-height: 30px;
  background-color: #fbfbfb;
  border-radius: 10px;
  border-top: 7px solid #4ca1af;
}
.field {
  float: left;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 4px 0;
}
.small-field {
  width: calc(50% / 3);
}
.big-field {
  width: 25%;
}
</style>
