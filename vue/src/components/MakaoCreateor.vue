<template>
  <q-page class="flex flex-center column">
    <MakaoSettings v-if="!created"></MakaoSettings>
    <MakaoBoard v-if="created"></MakaoBoard>
  </q-page>
</template>
<script>
import MakaoSettings from "@/components/MakaoSettings";
import MakaoBoard from "@/components/MakaoBoard";
import {mapState} from "vuex";
export default {
  name: "MakaoCreator",
  components: {MakaoBoard, MakaoSettings},

  computed: {
    ...mapState({
      created: (state) => state.makao.created
    })
  },
  mounted() {
    console.log(this.created, "eluwa")
  }
}
</script>
