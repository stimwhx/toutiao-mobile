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
      <van-tabs
        class="channel-tabs"
        v-model="active">
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
        <!--这个只是起到一个占位的做用，让真的汉堡层不会盖住频道的字-->
        <div
          slot="nav-right"
          class="wap-nav-placehoder"
        ></div>
          <div
            slot="nav-right"
            @click="isChannelEditShow=true"
            class="wap-nav-wrap"
          >
            <van-icon name="wap-nav" />
          </div>
      </van-tabs>
      <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        class="channel-edit-popup"
        closeable
        close-icon-position="top-left"
        get-container="body"
        :style="{ height: '100%' }" >
        <channel-edit
          :user-channels="channels"
        ></channel-edit>
      </van-popup>
    </div>
</template>
<script>
  import { getChannels } from '@/api/user'
  import ArticleList from './components/article-list'
  import ChannelEdit from './components/channel-edit'
    export default {
        name: 'HomeIndex',
        components: {
          ArticleList,
          ChannelEdit
        },
        props: {},
        data () {
            return {
              active: 0, // 控制被激活的标签
              channels: [],
              isChannelEditShow: true // 控制频道层是否显示
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
    .channel-tabs {
      /deep/ .van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/ .van-tabs__line{
        bottom: 16px;
        width: 15px !important;
        height: 5px;
        background: #3296fa;
      }
    }
    .wap-nav-wrap{
      position: fixed;
      right: 0;
      width: 33px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity:.9;
      .van-icon {
        font-size: 24px;
      }
      &:before {
        content:'';
        width: 3px;
        height: 29px;
        background: url("./line.png") no-repeat;
        background-size: contain;
        position: absolute;
        left:0;
        top:0;
      }
    }
    .wap-nav-placehoder{
      width: 33px;
      flex-shrink:0;
    }
  }
</style>
