<template>
  <div class="makao-table flex items-center justify-center">
    <div class="card-drawn"></div>
    <div class="card-stack">
      <GameCard suit="diamonds" value="J" reversed></GameCard>
    </div>
  </div>
</template>
<script>
import GameCard from "@/components/GameCard";
export default {
  name: "MakaoTable",
  components: {GameCard}
}
</script>
<style>
 .card-drawn {
   width: 60%;
   border-right: 1px solid black;
   height: 100%
 }
 .card-stack {
   width: 40%
 }
 .makao-table {
   height: 300px;
   width: 100%
 }
</style>
