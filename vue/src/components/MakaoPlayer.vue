<template>
  <div class="player flex items-center justify-center">
    <span :class="['player-name', {'me': me}]">{{playerName}}</span>
    <div v-if="isPlayerTurn" class="arrow">
      <span>▶</span>
    </div>
    <div class="player-hand flex justify-center items-center q-gutter-sm">
      <div v-for="(card, id) in cardsToShow" :key="id">
        <GameCard v-if="!card" reversed/>
        <GameCard
            @click="chooseCard(id)"
            v-if="card"
            :suit="card.suit"
            :value="card.value"
            :class="{'chosen': card.chosen}"
        />
      </div>
    </div>
    <div class="collector flex justify-around">
      <q-btn :class="[{hidden: !isMyTurn}]" @click="collect">Collect one card</q-btn>
      <q-btn :class="[{hidden: !isMyTurn || !anyCardSelected}]" @click="layOut">Lay out</q-btn>
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
      whichTurn: (state) => state.makao.whichTurn,
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
    },
    isPlayerTurn() {
      return this.whichTurn === this.playerId
    },
    anyCardSelected() {
      return this.cardsToShow.some(card => card?.chosen)
    },
    isMyTurn() {
      return this.whichTurn === this.myId && this.myId === this.playerId
    },

  },
  methods: {
    async chooseCard(id) {
      if(await this.$socket.client.request("canBeDrawn", {card: this.cardsToShow[id]}))
        this.cardsToShow[id].chosen = !this.cardsToShow[id].chosen
    },
    async collect() {
      await this.$socket.client.request("collect")
    },
    async layOut() {
      await this.$socket.client.request("layOut", {cards: this.cardsToShow.filter(card => card.chosen)})
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
  left: 15px;
  top: 3px;
}
.chosen {
  transform: translateY(-10px);
}
.arrow {
  position: absolute;
  left: 5px;
  top: 35px;
  color: #05b365;
  font-size: 25px;
}
.me {
  color: #809cc2;
  font-weight: bolder;
}
.hidden {
  display: none;
}
</style>
