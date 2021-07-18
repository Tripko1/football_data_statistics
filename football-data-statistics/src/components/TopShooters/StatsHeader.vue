<template>
  <div class="table-header">
    <div class="field big-field">Season</div>
    <div class="field small-field">GS</div>
    <div class="field small-field">SB</div>
    <div class="field small-field">G</div>
    <div class="field small-field">A</div>
    <div class="field small-field">SH</div>
    <div class="field small-field">SG</div>
    <div class="field small-field">FC</div>
    <div class="field small-field">FS</div>
    <div class="field small-field">YC</div>
    <div class="field small-field">RC</div>
  </div>
</template>

<style scoped>
.table-header {
  width: 100%;
  height: calc(100% / 16);
  min-height: 30px;
  background-color: #fbfbfb;
  border-radius: 10px;
  margin-top: 10px;
  border-top: 10px solid #4ca1af;
}
.field {
  float: left;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 4px 0;
}
.small-field {
  width: calc(80% / 10);
}
.big-field {
  width: 20%;
}
</style>
