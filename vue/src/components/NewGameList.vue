<template>
  <q-page class="flex flex-center column">
    <div @click="newGame('war')" class="game-button flex justify-center items-center">War</div>
    <div @click="newGame('makao')" class="game-button flex justify-center items-center">Makao</div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'NewGameList',

  data() {
    return {
      gameCode: "",
      name: "",
    }
  },

  methods: {
    newGame(gameId) {
      this.$router.push({ name: gameId });
    },
  },
}

</script>

<style lang="scss">
.game-button {
  border: solid 1px white;
  width: 100px;
  height: 100px;
}
</style>