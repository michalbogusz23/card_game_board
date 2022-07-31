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
export default {
  name: 'MakaoSettings',
  emits: ["makaoCreated"],
  data() {
    return {
      playersAmount: "4",
      gameId: Math.floor(Math.random() * 1_000_000),
      options: [1, 2, 3, 4],
      username: "",
    }
  },
  methods: {
    async createGame() {
      await this.$socket.client.request("create room", {
        roomId: this.gameId,
        roomCapacity: this.playersAmount},
      );
      this.$emit("makaoCreated")
      console.log("hej")
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
