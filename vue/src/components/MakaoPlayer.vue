<template>
  <div class="player flex items-center justify-center">
    <span :class="['player-name', {'me': me}]">{{playerName}}</span>
    <div v-if="isPlayerTurn" class="arrow">
      <span>▶</span>
    </div>
    <div v-if="playerPausedRounds" class="pausing">
      Pausing: {{ playerPausedRounds }} round(s)
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
      <q-btn :class="[{hidden: !isMyTurn}]" @click="collect">Collect</q-btn>
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
      playersPaused: (state) => state.makao.playersPaused,
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
    playerPausedRounds() {
      return Math.ceil(this.playersPaused[this.playerId] / this.players.size)
    }
  },
  methods: {
    async chooseCard(id) {
      if(await this.$socket.client.request("canBeDrawn", {card: this.cardsToShow[id]})) {
        this.cardsToShow[id].chosen = !this.cardsToShow[id].chosen
      } else {
        this.$q.notify( "You can't draw this card")
      }

    },
    async collect() {
      await this.$socket.client.request("collect")
    },
    async layOut() {
      await this.$socket.client.request("layOut", {cards: this.cardsToShow.filter(card => card.chosen)})
    }
  },
  sockets: {
    chooseDemand() {
      if (!this.me) return
      this.$q.dialog({
        title: "Choose demand",
        options: {
          type: "radio",
          model: null,
          items: [
            {label: "5", value: "5"},
            {label: "6", value: "6"},
            {label: "7", value: "7"},
            {label: "8", value: "8"},
            {label: "9", value: "9"},
            {label: "10", value: "10"},
            {label: "Q", value: "Q"},
          ],
        },
        persistent: true
      }).onOk(async (data) => {
        await this.$socket.client.request("layOut", {
          cards: this.cardsToShow.filter(card => card.chosen),
          demand: data
        })
      })
    },
    chooseSuit() {
      if (!this.me) return
      this.$q.dialog({
        title: "Change color",
        options: {
          type: "radio",
          model: null,
          items: [
            {label: "Spades ♠", value: "spades"},
            {label: "Hearts ♥", value: "hearts"},
            {label: "Diamonds ♦", value: "diamonds"},
            {label: "Clubs ♣", value: "clubs"},
          ],
        },
        persistent: true
      }).onOk(async (data) => {
        await this.$socket.client.request("layOut", {
          cards: this.cardsToShow.filter(card => card.chosen),
          choice: data
        })
      })
    },
  }
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
.arrow {
  position: absolute;
  left: 5px;
  top: 35px;
}
.me {
  color: #809cc2;
  font-weight: bolder;
}
.hidden {
  display: none;
}
</style>
