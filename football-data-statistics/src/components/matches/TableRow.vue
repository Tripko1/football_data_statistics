<template>
  <div class="table-row">
    <div
      v-if="match.stage !== 'REGULAR_SEASON'"
      class="field small-field"
      style="font-size: 0.7rem"
    >
      {{ match.stage }} {{ match.matchday }}
    </div>
    <div v-else class="field small-field">
      {{ match.matchday }}
    </div>

    <router-link :to="'/team/' + match.homeTeam.id">
      <div class="field big-field">{{ match.homeTeam.name }}</div>
    </router-link>

    <div v-if="match.score.penalties.homeTeam" class="field small-field">
      <span>
        {{ match.score.fullTime.homeTeam }} -
        {{ match.score.fullTime.awayTeam }}
      </span>
      <span style="font-size: 0.8rem">
        ({{ match.score.penalties.homeTeam }} -
        {{ match.score.penalties.awayTeam }})
      </span>
    </div>
    <div v-else class="field small-field">
      {{ match.score.fullTime.homeTeam }} -
      {{ match.score.fullTime.awayTeam }}
    </div>

    <router-link :to="'/team/' + match.awayTeam.id">
      <div class="field big-field">{{ match.awayTeam.name }}</div>
    </router-link>
    <div class="field small-field">{{ match.utcDate.split("T")[0] }}</div>
  </div>
</template>

<script>
export default {
  props: ["match"],
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
  width: calc(50% / 3);
}
.big-field {
  width: 25%;
  cursor: pointer;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
</style>
