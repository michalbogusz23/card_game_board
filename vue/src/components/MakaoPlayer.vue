<template>
  <div class="player flex items-center justify-center">
    <span class="player-name">{{playerName}}</span>
    <div class="player-hand"></div>
    <div class="collector flex justify-around">
      <q-btn disabled>Collect one card</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "MakaoPlayer",
  props: {
    playerName: {
      type: String,
      default: "Waiting for player...",
    }
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
  left: 5px;
  top: 3px;
}
</style>
