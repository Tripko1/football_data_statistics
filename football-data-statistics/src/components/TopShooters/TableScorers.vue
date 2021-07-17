<template>
  <table>
    <thead>
      <th>Full Name</th>
      <th>Team</th>
      <th>Goals</th>
      <th>Nationality</th>
      <th>Position</th>
      <th>Date of Birth</th>
    </thead>
    <tbody v-if="scorers.length > 0">
      <tr v-for="player in scorers" :key="player.player.id">
        <td>
          <router-link :to="'/player/' + player.player.id">
            <span>{{ player.player.name }}</span>
          </router-link>
        </td>
        <td>{{ player.team.name }}</td>
        <td>{{ player.numberOfGoals }}</td>
        <td>{{ player.player.nationality }}</td>
        <td>{{ player.player.position }}</td>
        <td>{{ player.player.dateOfBirth }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" style="padding-top: 20px; color: #2c3e50">
          Currently don't have data for scorers...
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    scorers() {
      return this.$store.getters["top/getShootersInView"];
    },
  },
};
</script>

<style scoped>
table {
  width: calc(100% - 20px);
  margin: auto;
  text-align: center;
  font-size: 1.5rem;
  border-spacing: 0;
  margin: 0 10px 10px 10px;
}
table thead {
  background-color: #fbfbfb;
}
td {
  padding: 2px;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
</style>
