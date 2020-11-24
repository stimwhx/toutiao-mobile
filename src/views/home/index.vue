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
        <!--
        标签页组件有一个功能，只有你在第1次查看标签页的时候才会宣染里面的内容。就是你点一下标签1，就选染一下标签1，
        再点一下标签2。就选染出来标签1和标签2
        -->
        <van-tab
          v-for="channel in channels"
          :title="channel.name"
          :key="channel.id"
        >
          <!-- 文章列表-->
         <article-list :channellist="channel"/>
          <!-- /文章列表-->
        </van-tab>

      </van-tabs>
    </div>
</template>
<script>
  import { getChannels } from '@/api/user'
  import ArticleList from './components/article-list'
    export default {
        name: 'HomeIndex',
        components: {
          ArticleList
        },
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
