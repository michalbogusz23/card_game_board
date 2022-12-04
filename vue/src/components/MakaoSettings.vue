<template>
    <div class="shadow-10 bg-grey-9 q-pa-lg container">
      <q-input class="q-mb-xl" v-model="username" label="Twoje imię"></q-input>
      <q-select
          v-model="playersAmount"
          :options="options"
          label="Liczba graczy"
          class="select q-mb-md">
      </q-select>
      <q-btn class="q-mx-lg" outline @click="createGame">Stwórz grę</q-btn>
    </div>
</template>

<style>
</style>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: 'MakaoSettings',
  data() {
    return {
      playersAmount: "2",
      gameId: "" + Math.floor(Math.random() * 1_000_000),
      options: [1, 2, 3, 4],
      username: "",
    }
  },
  computed: {
    ...mapState({
      name: "username"
    })
  },
  methods: {
    ...mapMutations({
      createMakao: "makao/create",
      setUsername: "setUsername",
      setCapacity: "room/setCapacity",
      setPlayers: "room/setPlayers",
      setId: "setId",
    }),
    async createGame() {
      this.unsecuredCopyToClipboard(this.gameId);
      this.$q.notify( "Skopiowano ID gry, prześlij je znajomemu")
      await this.$socket.client.request("create room", {
        roomId: this.gameId,
        roomCapacity: this.playersAmount,
        game: "makao"
      });
      const roomInfo = await this.$socket.client.request("join room", {
        userName: this.username,
        roomId: this.gameId
      });
      console.log("xdddd", roomInfo)
      this.setPlayers({players: roomInfo.players})
      this.setCapacity({capacity: roomInfo.capacity})
      this.setUsername({username: this.username})
      this.setId({id: this.$socket.client.id})
      this.createMakao();
    },
    unsecuredCopyToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
      document.body.removeChild(textArea);
    },
  },
  mounted() {
    this.username = this.name
  }
}
</script>

<style lang="scss" scoped>
.border {
  border: solid 1px white;
}
.container {
  border-radius: 5px;
  width: 250px;
  display: flex;
  flex-direction: column;
}
</style>
