<template>
    <div class="shadow-10 bg-grey-9 q-pa-lg">
      <q-input class="q-mb-xl" v-model="username" label="Your name"></q-input>
      <q-select
          v-model="playersAmount"
          :options="options"
          label="Number of players"
          class="select q-mb-md">
      </q-select>
      <q-btn outline @click="createGame">Create game</q-btn>
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
      playersAmount: "4",
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
    }),
    async createGame() {
      await this.$socket.client.request("create room", {
        roomId: this.gameId,
        roomCapacity: this.playersAmount,
        game: "makao"
      });
      await this.$socket.client.request("join room", {
        userName: this.name,
        roomId: this.gameId
      });
      this.setCapacity(this.playersAmount)
      this.setUsername({username: this.username})
      this.createMakao();
    },
  },
  mounted() {
    this.username = this.name
  }
}
</script>

<style lang="scss">
.border {
  border: solid 1px white;
}
.select {
  width: 150px;
}
</style>
