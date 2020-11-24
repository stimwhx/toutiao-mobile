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
      <van-tabs v-model="active">
        <van-tab
          v-for="channel in channels"
          :title="channel.name"
          :key="channel.id"
        >{{channel.name}}的内容</van-tab>

      </van-tabs>
    </div>
</template>
<script>
  import { getChannels } from '@/api/user'
    export default {
        name: 'HomeIndex',
        components: {},
        props: {},
        data () {
            return {
              active: 0, // 控制被激活的标签
              channels: []
            }
        },
        computed: {},
        watch: {},
        created () {
            this.loadChannels()
        },
        mounted () {
        },
        methods: {
       async   loadChannels () {
              const{ data } = await getChannels()
              this.channels = data.data.channels
          }
        }
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
