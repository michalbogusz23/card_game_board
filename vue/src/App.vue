<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'LayoutDefault',

  sockets: {
    connect() {
      console.log("Successfully connected to modules server")
    }
  },

  mounted() {
    const $q = useQuasar();
    $q.dark.set(true);
  },
}
</script>
<style lang="scss">
body.body--dark {
  background: #666666 !important;
}
</style>
