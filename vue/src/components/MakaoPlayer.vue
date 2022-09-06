<template>
  <div class="player flex items-center justify-center">
    <span :class="['player-name', {'me': me}]">{{playerName}}</span>
    <div class="player-hand flex justify-center items-center q-gutter-sm">
      <div v-for="(card, id) in cardsToShow" :key="id">
        <GameCard v-if="!card" reversed/>
        <GameCard v-if="card" :suit="card.suit" :value="card.value"/>
      </div>
    </div>
    <div class="collector flex justify-around">
      <q-btn disabled>Collect one card</q-btn>
    </div>
  </div>
</template>
<script>
import GameCard from "@/components/GameCard";
import {mapGetters, mapState} from "vuex";

export default {
  name: "MakaoPlayer",
  components: {GameCard},
  props: {
    playerId: String,
  },
  computed: {
    ...mapState({
      myId: (state) => state.id,
      players: (state) => state.makao.players,
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
    },
    cardsToShow() {
      if (Object.keys(this.players).length === 0) return []
      return Object.entries(this.players).filter(([id]) => id === this.playerId)[0][1]
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
