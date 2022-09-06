<template>
  <div class="makao-table flex items-center justify-center">
    <div class="card-drawn"></div>
    <div v-if="stack > 0" class="card-stack flex">
      <GameCard class="card-reversed" v-for="index in stack" :key="index" reversed></GameCard>
    </div>
  </div>
</template>
<script>
import GameCard from "@/components/GameCard";
import {mapState} from "vuex";
export default {
  name: "MakaoTable",
  components: {GameCard},
  computed: {
    ...mapState({
      stack: (state) => state.makao.stack,
    }),
  },
}
</script>
<style>
 .card-drawn {
   width: 60%;
   border-right: 1px solid black;
   height: 100%
 }
 .card-stack {
   width: 40%;
   gap: 25px;
   padding-left: 60px;
 }
 .makao-table {
   height: 300px;
   width: 100%
 }
 .card-reversed {
   margin-left: -50px;
 }
</style>
