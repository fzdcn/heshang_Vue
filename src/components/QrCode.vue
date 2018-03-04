<template>
  <div class="qr-bg-container">
    <div class="qr-bg image-max-width-100">
      <img src="/static/images/share-qr-bg.jpg">
    </div>
    <div class="qr-detail">
      <div v-if="qrOptions" id="qr-code-container" class="image-max-width-100">
        <QrCanvas :options="qrOptions" id="qr-canvas" style="display: none"></QrCanvas>
      </div>
    </div>
  </div>
</template>

<script>
  import QrCanvas from 'qrcanvas-vue'

  export default {
    name: 'QrCode',
    components: {
      QrCanvas,
    },
    props: [
      'url'
    ],
    data () {
      return {
        qrOptions: false,
      }
    },
    methods: {
      setQrCode (img) {
        this.qrOptions = {
          data: this.url,
          logo: {
            image: img,
            size: .05
          },
          size: 900
        }
      },
      // canvas 转成 img,可以长按识别
      convertCanvasToImage () {
        let qrCanvas = document.getElementById('qr-canvas')
        let image = new Image()
        image.src = qrCanvas.toDataURL('image/png')
        document.getElementById('qr-canvas').remove()
        document.getElementById('qr-code-container').appendChild(image)
        return true
      },
    },
    mounted() {
      let img = document.createElement('img')
      img.src = '/static/images/qr-logo.jpg'
      img.onload = () => {
        this.setQrCode(img)
        let a = setInterval(() => {
          try {
            if(this.convertCanvasToImage()){
              clearInterval(a)
            }
          } catch (e) {
            console.log(e)
          }
        }, 100)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/variable.styl'

  .qr-bg-container
    position relative

  .qr-detail
    position absolute
    top px2rem(772px)
    left 34%
    width 32%

</style>
