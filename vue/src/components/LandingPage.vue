<template>
  <q-page class="flex flex-center column">
    <div class="shadow-10 bg-grey-9">
      <div>
        <div class="flex flex-center">
          <q-input outlined v-model="gameCode" label="GAME CODE"></q-input>
          <q-btn outline @click="joinGame">Join game</q-btn>
        </div>
        <div>
          <q-input outlined v-model="name" label="YOUR NAME"></q-input>
        </div>
      </div>
      <div class="flex flex-center q-pa-xl">
        <q-btn outline @click="newGame">
          Create new game
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'LandingPage',

  data() {
    return {
      gameCode: "",
      name: "",
    }
  },
  mounted() {
    this.name = Math.floor(Math.random() * 100_000);
  },
  methods: {
    ...mapMutations({
      setCapacity: "room/setCapacity",
      setPlayers: "room/setPlayers",
      createMakao: "makao/create",
      setUsername: "setUsername"
    }),
    newGame() {
      this.setUsername({username: this.name})
      this.$router.push({ path: "/gameList" });
    },
    async joinGame() {
      const roomInfo = await this.$socket.client.request("join room", {
        roomId: this.gameCode,
        username: this.name
      });
      this.setPlayers(roomInfo.players)
      this.setCapacity(roomInfo.capacity)
      this.createMakao()
      this.setUsername(this.name)
      await this.$router.push({ path: `/${roomInfo.game}` });
    }
  },
}

</script>

<style lang="scss">
</style>
