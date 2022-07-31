<template>
  <q-page class="flex flex-center column">
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
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'MakaoSettings',

  data() {
    return {
      playersAmount: "4",
      gameId: Math.floor(Math.random() * 1_000_000),
      options: [1, 2, 3, 4],
      username: "",
    }
  },
  methods: {
    createGame() {
      this.$socket.client.emit("create room", {
        roomId: this.gameId,
        roomCapacity: this.playersAmount},
      );
    },
  },
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
