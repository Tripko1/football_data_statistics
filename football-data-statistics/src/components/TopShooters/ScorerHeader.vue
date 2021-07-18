<template>
  <div class="score-header">
    <div class="field big-field">Full Name</div>
    <div class="field big-field">Team</div>
    <div class="field small-field">Goals</div>
    <div class="field small-field">Nationality</div>
    <div class="field small-field">Position</div>
    <div class="field small-field">Date of Birth</div>
  </div>
</template>

<style scoped>
.score-header {
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 4px 0;
}
.small-field {
  width: 15%;
}
.big-field {
  width: 20%;
  cursor: pointer;
}
</style>
