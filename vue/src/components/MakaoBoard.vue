<template>
  <MakaoPlayer :player-id="playersId[0]" class="makao-player"></MakaoPlayer>
  <MakaoPlayer v-if="playerAmount > 3" :player-id="playersId[3]" class="makao-player"></MakaoPlayer>
  <MakaoTable class="makao-table"></MakaoTable>
  <MakaoPlayer :player-id="playersId[1]" class="makao-player"></MakaoPlayer>
  <MakaoPlayer v-if="playerAmount > 2" :player-id="playersId[2]" class="makao-player"></MakaoPlayer>
</template>
<script>
import MakaoPlayer from "@/components/MakaoPlayer";
import MakaoTable from "@/components/MakaoTable";
import {mapState} from "vuex";
export default {
  name: "MakaoBoard",
  components: {MakaoTable, MakaoPlayer},
  computed: {
    ...mapState({
      playerAmount: (state) => state.room.capacity,
      playersObject: (state) => state.room.players,
    }),
    playersId() {
      return Object.values(this.playersObject).map((player) => player.id)
    }
  }
}
</script>
<style></style>
