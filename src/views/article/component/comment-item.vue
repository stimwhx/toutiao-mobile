<template>
    <!--<div class="comment-item">首页</div>-->
  <van-cell class="comment-item" >
    <van-image
      class="avatar"
      slot="icon"
      width="36px"
      height="36px"
      round
      fit="cover"
      :src="comment.aut_photo" />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-wrap">
          <van-icon
            class="like-icon"
            name="good-job-o"></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{comment.content}}</div>
      <div>
        <span class="pubdate">{{comment.pubdate | datetime('MM:DD HH:mm')}}</span>
        <van-button
          class="reply-btn"
        round
        size="mini"
        >{{ comment.reply_count }}回复</van-button>
      </div>
    </div>

  </van-cell>
</template>
<script>
    export default {
        name: 'CommentItem',
        components: {},
        props: {
          comment: {
              type: Object,
            required: true
          }
        },
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
  .comment-item{
    .title-wrap{
      display: flex;
      justify-content: space-between;
    }
    .avatar{
      height: 36px;
      width: 36px;
      margin-right: 13px;
    }
    .name{
      font-size: 14px;
      color: #406599;
    }
    .content{
      font-size: 16px;
      color: #222222;
    }
    .pubdate{
      margin-right: 10px;
      font-size: 10px;
    }
    .like_wrap{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
