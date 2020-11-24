<template>
    <div class="article-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list" :key="item" :title="item"
        ></van-cell>

      </van-list>
    </div>
</template>
<script>
  import { getArticles } from '@/api/article'
    export default {
        name: 'ArticleList',
        components: {},
        props: {
          channellist: {
              type: Object,
              required: true
          }
        },
        data () {
            return {
                list: [], // 数据列表
              loading: false, // 控制加载中的loading状态，不满一屏自动为true加载，为一屏后自动会设置为false
              finished: false // 控制加载结束的状态，当加载结整，不在触发加载更多
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          async  onLoad () {
                // 1、发送请求
              const { data } = await getArticles({
                channel_id: this.channellist.id,
                timestamp: Date.now(),
                with_top: 1
              })
            console.log(data)
            }

        }
    }
</script>

<style scoped lang="less">
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>
