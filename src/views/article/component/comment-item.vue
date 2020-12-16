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
        <div class="like-wrap" @click="onCommentLike">
          <!--
          我们又用到了对于class如果是真就做用这个class值，如果是假就不做用这个值
          -->
          <van-icon
            class="like-icon"
            :class="{
              liked: comment.is_liking
            }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{comment.content}}</div>
      <div>
        <span class="pubdate">{{comment.pubdate | datetime('MM:DD HH:mm')}}</span>
        <!-- 我们在这里把我们评论的对象往上抛给父组件comment-list -->
        <van-button
          class="reply-btn"
        round
        size="mini"
        @click="$emit('reply-comment', comment)"
        >{{ comment.reply_count }}回复</van-button>
      </div>
    </div>

  </van-cell>
</template>
<script>
  import { addCommentLike, deleteCommentLike } from '@/api/comment'
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
        methods: {
         async onCommentLike () {
            const commentId = this.comment.com_id.toString()
           if(this.comment.is_liking) {
                // 已点赞，取消点赞
             await deleteCommentLike(commentId)
             this.comment.like_count--

           } else {
               // 没有点赞，添加点赞
             await addCommentLike(commentId)
             this.comment.like_count++
           }
           // 更新视图
           this.comment.is_liking = !this.comment.is_liking
          }
        }
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
    .like-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .like-icon.liked{
      color: #ff69b4
    }
  }
</style>
