<template>
    <div class="comment-reply">
      <!-- 文章标题 -->
      <van-nav-bar
        :title="`${comment.reply_count.toString()}条回复`"
      >
        <van-icon
          slot="left"
          name="cross"
          @click="$emit('close')"
        />
      </van-nav-bar>
      <!-- /文章标题 -->
      <!-- 回复项 -->
      <comment-item
      :comment="comment"
      />
      <!-- /回复项 -->
      <!--所有评论项-->
<van-cell>所有回复</van-cell>
      <comment-list
        :source="comment.com_id"
        type="c"
        :list="commentList"
      />
      <!--/所有评论项-->
      <div class="article-bottom"
      >
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow = true"
        >写评论</van-button>
      </div>
      <van-popup
      v-model="isPostShow"
      position="bottom"
      >
        <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSucess"
        />
      </van-popup>
    </div>
</template>
<script>
  import CommentItem from './comment-item'
  import CommentList from './comment-list'
  import PostComment from './post-comment'
    export default {
        name: 'CommentReply',
        components: {
          CommentItem,
          CommentList,
          PostComment
        },
        props: {
            // 查看回复的评论项
            comment: {
                type: Object,
              required: true
            },
          articleId: {
            type: [Number, String, Object],
            default: null
          }
        },
        data () {
            return {
              isPostShow: false,
              commentList: [] // 回复的评论列表，
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onPostSucess (comment) {
              // 把内容给list以更新试图,报回复放在顶部
            this.commentList.unshift(comment)
            // 更新评论数量
            this.comment.reply_count++
            //关闭弹层
            this.isPostShow = false
          }
        }
    }
</script>

<style scoped lang="less">
  .article-bottom{
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    height: 44px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    position: fixed;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7
    }}
</style>
