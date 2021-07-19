<template>
  <base-card v-if="selectedPlayer">
    <span class="back" @click="goBack">
      <img class="left_arrow" :src="leftArrow" alt="Back" />
    </span>
    <div v-if="error" class="errorMessage">{{ error }}</div>
    <div v-else class="container">
      <div class="half-container">
        <div class="quater-container">
          <div class="name">
            {{ selectedPlayer.shirtNumber }} {{ selectedPlayer.name }}
          </div>
          <div class="picture">
            <img :src="profile" alt="" />
          </div>
        </div>
        <div class="quater-container">
          <the-row
            :image="name"
            :value="diff_years(new Date(), selectedPlayer.dateOfBirth)"
            ali="AGE"
            title="name"
          ></the-row>
          <the-row
            :image="country"
            :value="selectedPlayer.countryOfBirth"
            ali="COB"
            title="country of birth"
          ></the-row>
          <the-row
            :image="calendar"
            :value="birthDate(selectedPlayer.dateOfBirth)"
            ali="DOB"
            title="date of birth"
          >
          </the-row>
          <the-row
            :image="passport"
            :value="selectedPlayer.nationality"
            ali="NAT"
            title="nationality"
          ></the-row>
          <the-row
            :image="position"
            :value="selectedPlayer.position"
            ali="POS"
            title="postion"
          ></the-row>
        </div>
      </div>
      <div class="half-container">
        <stats-header></stats-header>
        <div class="text">Data is not available...</div>
      </div>
    </div>
  </base-card>
</template>

<script>
import TheRow from "./TheRow.vue";
import StatsHeader from "./StatsHeader.vue";
export default {
  components: {
    TheRow,
    StatsHeader,
  },
  data() {
    return {
      position: require("../../assets/position.png"),
      name: require("../../assets/name.png"),
      passport: require("../../assets/passport.png"),
      calendar: require("../../assets/calendar.png"),
      country: require("../../assets/country.png"),
      leftArrow: require("../../assets/left_arrow.gif"),
      profile: require("../../assets/profile.png"),
    };
  },
  computed: {
    selectedPlayer() {
      return this.$store.getters["top/getSelectedPlayer"];
    },
    error() {
      return this.$store.getters["top/getErrorShooters"];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    diff_years(dt2, dt1) {
      if (dt1) {
        dt1 = new Date(dt1);
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60 * 60 * 24;
        return Math.abs(Math.round(diff / 365.25));
      }
      return null;
    },
    birthDate(date) {
      if (date) {
        const d = date.split("-");
        let string = d[2] + " ";
        if (d[1] === "01") {
          string += "Jan,";
        } else if (d[1] === "02") {
          string += "Feb,";
        } else if (d[1] === "03") {
          string += "Mar,";
        } else if (d[1] === "04") {
          string += "Apr,";
        } else if (d[1] === "05") {
          string += "May,";
        } else if (d[1] === "06") {
          string += "Jun,";
        } else if (d[1] === "07") {
          string += "Jul,";
        } else if (d[1] === "08") {
          string += "Aug,";
        } else if (d[1] === "09") {
          string += "Sep,";
        } else if (d[1] === "10") {
          string += "Oct,";
        } else if (d[1] === "11") {
          string += "Nov,";
        } else if (d[1] === "12") {
          string += "Dec,";
        }
        string += d[0];
        return string;
      }
      return null;
    },
  },
  beforeCreate() {
    const playerId = this.$route.params.playerId;

    this.$store.dispatch("top/setSelectedPlayer", {
      id: playerId,
    });
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 60px);
}
.back {
  position: absolute;
  top: 100px;
  right: calc(10% + 10px);
  cursor: pointer;
}
.left_arrow {
  height: 40px;
  width: 40px;
  background-color: transparent;
  border-radius: 10px;
}
.half-container {
  width: 100%;
  height: 50%;
}
.quater-container {
  padding: 5px;
  width: calc(50% - 10px);
  height: calc(100% - 10px);
  float: left;
}
.name {
  width: 100%;
  height: 60px;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.picture {
  height: calc(100% - 60px);
  width: 100%;
}
.errorMessage {
  padding-top: 40px;
  color: #2c3e50;
  font-size: 30px;
}
img {
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
.text {
  padding-top: 10px;
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
