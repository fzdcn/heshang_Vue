<template>
  <app-layout :withHeader="false">
    <qr-code :url="registerUrl"></qr-code>
  </app-layout>
</template>

<script>
  import AppLayout from '../../components/AppLayout'
  import QrCode from '../../components/QrCode'

  export default {
    name: 'QrDetail',
    components: {
      AppLayout,
      QrCode
    },
    computed: {
      registerUrl () {
        let url = 'http://' + window.location.host + '/register'
        let username = this.$store.getters.username
        if(username){
            url += '?rec=' + username
        }
        return url
      }
    }
  }
</script>
