<template>
  <q-page class="flex flex-center q-gutter-x-lg">
    <div @click="newGame('war')" class="shadow-10 bg-grey-9 game-button">War</div>
    <div @click="newGame('makao')" class="shadow-10 bg-grey-9 game-button">Makao</div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  font-size: 20px;
}
</style>
