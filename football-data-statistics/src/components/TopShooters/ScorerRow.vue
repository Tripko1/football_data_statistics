<template>
  <div class="table-row" v-if="player !== null">
    <router-link :to="'/player/' + player.player.id">
      <div class="field big-field">
        {{ player.player.name }}
      </div>
    </router-link>

    <router-link :to="'/team/' + player.team.id">
      <div class="field big-field">
        {{ player.team.name }}
      </div>
    </router-link>

    <div class="field small-field">
      {{ player.numberOfGoals }}
    </div>

    <div class="field small-field">
      {{ player.player.nationality }}
    </div>

    <div class="field small-field">
      {{ player.player.position }}
    </div>

    <div class="field small-field">
      {{ player.player.dateOfBirth }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["player"],
};
</script>

<style scoped>
.table-row {
  width: 100%;
  height: calc((100% / 16) - 1px);
  min-height: 30px;
  border-bottom: 1px solid #2c3e50;
}
.field {
  float: left;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  padding: 5px 0;
}
.small-field {
  width: 15%;
}
.big-field {
  width: 20%;
  cursor: pointer;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
</style>
