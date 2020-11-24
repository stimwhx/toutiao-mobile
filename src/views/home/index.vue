<template>
    <div class="home-container">
      <van-nav-bar
        class="nav-bar-app"
      >
        <van-button
          slot="title"
          round
          icon="search"
          type="info"
          size="small"
          class="search-btn"
        >搜索</van-button>
      </van-nav-bar>
    </div>
</template>
<script>
    export default {
        name: 'HomeIndex',
        components: {},
        props: {},
        data () {
            return {}
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  .home-container{
    /deep/.van-nav-bar__title{
      max-width: none;
    }
    .search-btn{
      width: 277px;
      height: 32px;
      background: #5babfb;
      border:none;
      .van-icon{
        font-size: 16px;
      }
      .van-button__text{
        font-size: 14px;
      }
    }
  }
</style>
