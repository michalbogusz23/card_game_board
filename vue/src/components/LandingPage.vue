<template>
  <q-page class="flex flex-center column">
    <div class="container shadow-5 bg-grey-9">
      <div>
        <q-input outlined v-model="name" label="Twoje imię"></q-input>
      </div>
    </div>
    <div class="container shadow-10 bg-grey-9">
      <div class="flex flex-center q-gutter-lg">
        <q-input outlined v-model="gameCode" label="Kod gry"></q-input>
        <q-btn outline @click="joinGame">Dołącz do gry</q-btn>
      </div>
    </div>
    <div class="container shadow-10 bg-grey-9 flex flex-center">
      <q-btn outline @click="newGame">
        Stwórz grę
      </q-btn>
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
      setUsername: "setUsername",
      setId: "setId",
    }),
    newGame() {
      this.setUsername({username: this.name})
      this.$router.push({ path: "/gameList" });
    },
    async joinGame() {
      const roomInfo = await this.$socket.client.request("join room", {
        roomId: this.gameCode,
        userName: this.name
      });
      this.setPlayers({players: roomInfo.players})
      this.setCapacity({capacity: roomInfo.capacity})
      this.createMakao()
      this.setUsername({username: this.name})
      this.setId({id: this.$socket.client.id})
      await this.$router.push({ path: `/${roomInfo.game}` });
    }
  },
}

</script>

<style lang="scss" scoped>
.container {
  width: 450px;
  padding: 15px 30px 15px 30px;
  margin: 10px;
  border-radius: 5px;
}
</style>
