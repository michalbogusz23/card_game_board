<template>
  <q-page class="flex flex-center column">
    <div class="shadow-10 bg-grey-9">
      <div>
        <div class="flex flex-center">
          <q-input outlined v-model="gameCode" label="GAME CODE"></q-input>
          <q-btn outline>Join game</q-btn>
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
export default {
  name: 'LandingPage',

  data() {
    return {
      gameCode: "",
      name: "",
    }
  },
  sockets: {
    hej(czesc) {
      console.log(czesc)
    }
  },
  mounted() {
    this.name = Math.floor(Math.random() * 100_000);
    this.$socket.client.request("create room", {roomId: "siema", roomCapacity: 13},);
  },
  methods: {
    newGame() {
      this.$router.push({ path: "/gameList" });
    }
  },
}

</script>

<style lang="scss">
</style>
