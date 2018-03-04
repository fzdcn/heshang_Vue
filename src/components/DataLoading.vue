<template>
  <div class="data-loading">
    <template v-if="isLoading && !isLoadToEnd">加载中<img src="/static/images/data-loading.gif"></template>
    <template v-if="isLoadToEnd">没有更多了</template>
  </div>
</template>

<script>
  export default {
    name: 'DataLoading',
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      isLoadToEnd: {
        type: Boolean,
        default: false
      },
    }
  }
</script>
