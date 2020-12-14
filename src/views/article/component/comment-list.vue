<template>
    <div class="comment-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell>全部评论</van-cell>
        <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        />
        <!--van-cell v-for="item in list" :key="item" :title="item" />-->
      </van-list>
    </div>
</template>
<script>
  import { getCmments } from '@/api/comment'
  import CommentItem from './comment-item'
    export default {
        name: 'CommentList',
        components: {
          CommentItem
        },
        props: {
          source: {
                type: [Number, String, Object],
              required: true
            }
        },
        data () {
            return {
              list: [],
              loading: false,
              finished: false,
              offset: null,
              limit: 10
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onLoad () {
              this.list = [{
                  aut_id: 1,
                aut_name: '王洪晓',
                aut_photo: 'https://img.yzcdn.cn/vant/cat.jpeg',
                com_id: Object,
                content: '啊啊啊啊啊啊啊',
                is_liking: false,
                is_top: 0,
                like_count: 12,
                pubdate: '2020-05-01 22:59:23',
                reply_count: 18
              }]
            // 加载状态结束
            this.loading = false

            // 数据全部加载完成
            if (this.list.length >= 40) {
              this.finished = true
            }
          }
            /*// 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
              for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1)
              }

              // 加载状态结束
              this.loading = false

              // 数据全部加载完成
              if (this.list.length >= 40) {
                this.finished = true
              }
            }, 1000)*/
          }

         /*async onLoad () {
          console.log(this.source)
            // 1、 获取数据
            const { data } = await getCmments({
              type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
              source: parseInt(this.source), // 源id，文章id或评论id
              offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
              limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
            })
          // 2、把数据放在列表里
          const { results } = data.data
          this.list.push(results)
          // 3、将本次的loading关闭
          this.loading = false
          // 4、判断是不否还有数据，有就加载，没有就把finish值为false
          if (results.length) {
                this.offset = data.data.last_id
          } else {
                this.finished = true
          }*/
    }
</script>

<style scoped lang="less">
</style>
