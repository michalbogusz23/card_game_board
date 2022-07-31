<template>
  <q-page class="flex flex-center column">
    <MakaoSettings v-if="!created" @makao-created="makaoCreated"></MakaoSettings>
    <MakaoBoard v-if="created"></MakaoBoard>
  </q-page>
</template>
<script>
import MakaoSettings from "@/components/MakaoSettings";
import MakaoBoard from "@/components/MakaoBoard";
export default {
  name: "MakaoCreator",
  components: {MakaoBoard, MakaoSettings},
  data() {
    return {
      created: false,
    }
  },

  methods: {
    makaoCreated() {
      this.created = true;
    }
  }
}
</script>
