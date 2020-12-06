<template>
    <div class="article-list">
      <!--
      想让谁往下拉就用van-pull-refresh把这个组件给他包住
      -->
      <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="refreshSuccessText"
        :success-duration="1500"
        @refresh="onRefresh"
      >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article,index) in articles"
          :key="index"
          :article="article"
        >

        </article-item>
       <!-- <van-cell

        ></van-cell>-->

      </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
  import { getArticles } from '@/api/article'
  import ArticleItem from '@/components/article-item'
    export default {
        name: 'ArticleList',
        components: {
          ArticleItem
        },
        props: {
          channellist: {
              type: Object,
              required: true
          }
        },
        data () {
            return {
                articles: [], // 数据列表
              loading: false, // 控制加载中的loading状态，不满一屏自动为true加载，为一屏后自动会设置为false
              finished: false, // 控制加载结束的状态，当加载结整，不在触发加载更多
              timestamp: null, // 获取下一页的时间戳
              isRefreshLoading: false, // 下拉刷新的状态
              refreshSuccessText: ''
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
                timestamp: this.thimestamp || Date.now(),
                // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳
                // 下一页数据例用上一次返回的数据中的时间戳
                with_top: 1
              })

            // 2、把数据放到 articles这个数组里，注意我们要把一个数组放在别一个数组里的写方法 加。。。
            // 有了这个相当于我们把这个results里数组的每一项都展开了放在了articles里。
            const { results } = data.data
            this.articles.push(...results)
            // 3、设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
            this.loading = false
            // 4、数据全部加载完成
            if(results.length) {
                this.timestamp = data.data.pre_timestamp
            }else {

            }
            },
          async onRefresh () {
              // 下拉刷新，组件自己就会展示loading
            // 1、 请求获取数据
            const { data } = await getArticles({
              channel_id: this.channellist.id,
              timestamp: Date.now(),
             // 为了方便大家学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空。
              with_top: 1
            })
              // 2、把数据放到数据列表中，因为是在上边的下拉刷新，我们要把数据放在list顶部 用unshift
            const { results } = data.data
            this.articles.unshift(...results)
            // 3、关闭刷新的状态 loading
            this.isRefreshLoading = false
            // 4、添加更新成功提示
            this.refreshSuccessText = `更新了${results.length}条数据`
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
