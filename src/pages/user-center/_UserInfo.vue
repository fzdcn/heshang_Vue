<template>
  <div>
    <div class="container">
      <div class="user-box">
        <div class="user-avatar">
          <vue-core-image-upload
            class="image-upload"
            :url="imageUploadUrl"
            text="更换头像"
            :inputOfFile="imageUploadData.name"
            extensions="png,jpg"
            crop="local"
            cropRatio="1:1"
            :cropBtn="{ok:'确定','cancel':'取消'}"
            :max-file-size="5242880"
            :maxWidth="200"
            inputAccept="image/*"
            :data="imageUploadData"
            :credentials="false"
            @imageuploaded="imageUploaded"
            @errorhandle="imageUploadErrorHandle"
          >
            <img :src="userInfo.userAvatar" alt="avatar" class="user-head">
            <i class="iconfont icon-edit-circle top-right-icon"></i>
          </vue-core-image-upload>
        </div>
        <div class="user-info">
          <span @click="modifyNicknameShow=true" class="user-name-box">
            <span class="user-name">昵称：{{ userInfo.nickname }}</span>
            <i class="iconfont icon-edit-circle top-right-icon"></i>
          </span>
          <span class="user-username">姓名：{{ userInfo.name }}</span>
          <span class="user-username">编号：{{ userInfo.username }}</span>
        </div>
      </div>
      <router-link :to="{name: 'share', params: {username: userInfo.username}}" class="qr-code">
        <i class="iconfont icon-Qrcode"></i>
        <span class="text">推广码</span>
      </router-link>
    </div>
    <div v-if="modifyNicknameShow" class="overlayer" @touchmove.prevent @click.self="modifyNicknameShow=false">
      <div class="pop">
        <div class="title">
          修改昵称
        </div>
        <form class="form">
          <div class="form-group">
            <label class="control-label">
              <span class="label">昵称</span>
              <input v-model="userInfo.nickname" class="input-control" type="text">
            </label>
          </div>
          <div @click="modifyNickname" class="submit btn btn-block btn-green">确定</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {showAlert} from '../../functions'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import {IMAGE_UPLOAD_URL} from '../../config/const'

  export default {
    name: 'UserInfo',
    components: {
      VueCoreImageUpload
    },
    data () {
      return {
        userInfo: {
          username: this.$store.getters.username,
          nickname: this.$store.getters.user.M_nickname,
          name: this.$store.getters.user.M_Name,
          userAvatar: this.$store.getters.user.M_headimg ? this.$store.getters.user.M_headimg : '/static/images/default_avatar.png'
        },

        imageUploadUrl: IMAGE_UPLOAD_URL,
        imageUploadData: {
          name: 'filename',
          prefix: 'user-head'
        },

        modifyNicknameShow: false
      }
    },
    methods: {
      imageUploaded (data) {
        if (data.code == 200) {
          this.userInfo.userAvatar = data.filenames[0]
          this.updateUserInfo({
            head: this.userInfo.userAvatar
          })
        } else {
          showAlert(data.error)
        }
      },
      imageUploadErrorHandle () {
        showAlert('文件上传出错')
      },
      modifyNickname () {
        this.updateUserInfo({
          nickname: this.userInfo.nickname
        }).then(() => {
          this.modifyNicknameShow = false
        })
      },
      updateUserInfo (params) {
        return this.$httpPost('mine/update', params).then(({data}) => {
          this.$store.dispatch('userUpdate', data)
          showAlert('修改成功', 'success')
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/variable.styl'

  $lrPadding = px2rem(40px)
  $boxMarginBottom = px2rem(20px)

  .container
    display flex
    justify-content space-between
    align-items center
    padding $lrPadding

    .user-box
      display flex
      justify-content flex-start
      align-items center
      .user-avatar
        position relative
        width px2rem(120px)
        height px2rem(120px)
        img
          width 100%
          height 100%
        .image-upload
          overflow visible
      .user-info
        margin-left px2rem(20px)
        font-size $fontSizeExtraLarge
        .user-name-box
          position relative
          display block
          font-size $fontSizeLarge
          .user-name
            display inline-block
            max-width px2rem(400px)
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
          .top-right-icon
            top -5px
            right -20px
        .user-username
          display block
          margin-top px2rem(5px)
          font-size $fontSizeSmall
          color $darkGrey

    .qr-code
      text-align center
      .iconfont
        font-size px2rem(60px)
      .text
        display block
        font-size $fontSizeSmall
        text-align center

  .pop
    position absolute
    top 30%
    left 5%
    width 90%
    border 1px solid $green
    background-color $white
    z-index 999
    .title
      background-color $green
      color: $white
      padding px2rem(15px)
      margin-bottom px2rem(15px)
      text-align center
      font-size $fontSizeLarge
</style>
