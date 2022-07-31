<template>
  <MakaoPlayer class="makao-player"></MakaoPlayer>
  <MakaoPlayer class="makao-player"></MakaoPlayer>
  <MakaoTable class="makao-table"></MakaoTable>
  <MakaoPlayer class="makao-player"></MakaoPlayer>
  <MakaoPlayer class="makao-player"></MakaoPlayer>
</template>
<script>
import MakaoPlayer from "@/components/MakaoPlayer";
import MakaoTable from "@/components/MakaoTable";
export default {
  name: "MakaoBoard",
  components: {MakaoTable, MakaoPlayer},

}
</script>
<style></style>
