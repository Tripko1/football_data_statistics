<template>
  <div class="table-row">
    <div class="field small-field">{{ table.position }}.</div>

    <router-link :to="'/team/' + table.team.id">
      <div class="field big-field">
        <img :src="table.team.crestUrl" alt="" />
        <span>{{ table.team.name }}</span>
      </div>
    </router-link>

    <div class="field small-field">{{ table.playedGames }}</div>

    <div class="field small-field">{{ table.won }}</div>

    <div class="field small-field">{{ table.draw }}</div>

    <div class="field small-field">{{ table.lost }}</div>

    <div class="field small-field">{{ table.goalsFor }}</div>

    <div class="field small-field">{{ table.goalsAgainst }}</div>

    <div class="field small-field">{{ table.goalDifference }}</div>

    <div class="field small-field">
      <strong>{{ table.points }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: ["table"],
};
</script>

<style scoped>
.table-row {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #2c3e50;
}
.field {
  float: left;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
}
.small-field {
  width: calc(75% / 9);
  padding: 10px 0 10px 0;
}
.big-field {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-weight: 600;
  padding: 5px 0;
  width: 25%;
}
img {
  width: 30px;
  height: 30px;
  background-color: transparent;
}

a {
  color: #2c3e50;
  text-decoration: none;
}
span {
  position: relative;
  left: 10px;
  bottom: 5px;
  height: 45px;
  width: calc(100% - 50px);
  margin: auto;
  font-size: 20px;
}
</style>
