<template>
  <div class="player flex items-center justify-center">
    <span :class="['player-name', {'me': me}]">{{playerName}}</span>
    <div class="player-hand"></div>
    <div class="collector flex justify-around">
      <q-btn disabled>Collect one card</q-btn>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "MakaoPlayer",
  props: {
    playerId: String,
  },
  computed: {
    ...mapState({
      myId: (state) => state.id
    }),
    ...mapGetters({
      getPlayerName: "room/getPlayerName"
    }),
    me() {
      return this.myId === this.playerId
    },
    playerName() {
      console.log("ziemniak", this.playerId)
      if (this.playerId) return this.getPlayerName(this.playerId)
      return "Waiting for player..."
    }
  },
}
</script>
<style>
.player {
  height: 100px;
  width: 100%;
  border: 1px solid black;
  position: relative;
}
.player-hand {
  border-right: 1px solid black;
  width: 70%;
  height: 100%;
}
.collector {
  width: 30%;
  height: 100%;
}
.player-name {
  position: absolute;
  left: 5px;
  top: 3px;
}
.me {
  color: #809cc2;
  font-weight: bolder;
}
</style>
