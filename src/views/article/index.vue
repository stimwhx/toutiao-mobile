<template>
    <div class="article-container">
      <!-- 导航栏 navbar组件-->
      <van-nav-bar
        class="nav-bar-app"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 导航栏-->
      <div class="article-wrap">
        <h1 class="title">{{ article.title}}</h1>
        <van-cell
          class="user-info"
          center
        >
          <div slot="title" class="name">{{ article.aut_name }}</div>
          <van-image
            class="avator"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo" />
          <div slot="label" class="pudate">{{ article.pubdate | relativeTime}}</div>
          <van-button
            class="follow-btn"
            :loading="isFollowloading"
            :type="article.is_followed ? 'default' : 'info' "
            round
            size="small"
            :icon="article.is_followed ? '' : 'plus' "
            @click="onFollow"
          >{{ article.is_followed ? '己关注' : '关注' }}</van-button>
        </van-cell>
        <div class="markdown-body"
             v-html="article.content"
             ref="article-content"
        >
        </div>
        <!-- 文章评论列表 -->
        <!-- 在comment-list的父组件中，对点击回复的按钮给出响应-->
        <comment-list
          :source="articleId"
          :list="commentList"
          @update-comment-count="totalCommentCount = $event"
          @reply-comment="onReplyClick"
        />
      </div>
      <div class="article-bottom"
      >
        <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button>
        <van-icon
        name="comment-o"
        :info="totalCommentCount"
        color="#777"
        />
        <van-icon
          :color="article.is_collected ? 'orange' : '#777'"
          :name="article.is_collected ? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          :color="article.attitude ===1 ? 'hotpink' : '#777'"
          :name="article.arttitude === 1 ? 'good-job' : 'good-job-o'"
          @click="onLike"
        />
        <!--<van-icon name="share" color="#777777"></van-icon>-->
      </div>
      <!-- 发布评论
      不加:style="{ height: '30%' }"自动由内容称开弹出层
      -->
      <van-popup
        v-model="isPostShow"
        position="bottom"
      >
        <post-comment
          :target="articleId"
          @post-success="onPostSuccess"
        />
      </van-popup>
      <!-- 发布评论-->
      <!-- 评论的回复 -->
      <van-popup
        v-model="isReplyShow"
        position="bottom"
      >
        <comment-reply
          v-if="isReplyShow"
        @close="isReplyShow = false"
          :article-id="articleId"
        :comment="replyComment"
        />
      </van-popup>
      <!-- /评论的回复 -->
    </div>
</template>
<script>
  import './github-markdown.css'
  import {
    getArticleById,
    addCollect,
    deleteCollect,
    addLink,
    deleteLink
  } from '@/api/article'
  import { addFollow, deleteFollow } from '@/api/user'
  // 这个要单独引用
  import { ImagePreview } from 'vant'
  import CommentList from './component/comment-list'
  import PostComment from './component/post-comment'
  import CommentReply from './component/comment-reply'
    export default {
        name: 'ArticleIndex',
        components: {
          CommentList,
          PostComment,
          CommentReply
        },
      // 在组件中动太获取路由参数的方法有两种
      // 方式一： this.$route.params.articleID
      // 方式二： props 传参，推荐
      // this.articleId
        props: {
          articleId: {
              type: [Number, String, Object],
            required: true
          }
        },
        data () {
            return {
                article: {}, // 文章详情
              isFollowloading: false,
              isPostShow: false, // 控制发布评论的显示状态
              commentList: [], // 文章评论列表
              totalCommentCount: 0, // 评论总数据量
              isReplyShow: false, // 评论的回复是否展示
              replyComment: {} // 这是拿到评论项
            }
        },
        computed: {},
        watch: {},
        created () {
            this.loadArticle()
        },
        mounted () {
        },
        methods: {
          async loadArticle () {
              console.log(typeof this.articleId)
              const { data } = await getArticleById(this.articleId)
            this.article = data.data

            // 数据改变影响视图更新（dom） 不是立即的
            // 所以如果需要在修改数据之后马上操作被该数据影响的视图DOM,要把这个代码放在$nextTick中
            // 得到所有的img标签
            // this.$nextTick是vue提供的一个方法
            this.$nextTick(() => {
                  this.handlePerviewImage()
            })
          },
          handlePerviewImage () {
            // 在文章详情页展示图片
            // 1、 获取文章内容DOM容器
            const articleContent = this.$refs['article-content']
            // 2、得到所有图片列表
            const imgs = articleContent.querySelectorAll('img')
              console.log(imgs)
            const imgPath = []
            imgs.forEach((img, index) => {
                // 3、给图片注册点击事件
                img.onclick = function () {
                  imgPath.push(img.currentSrc)
                  // 4、预览图片
                  ImagePreview({
                    images: imgPath,
                    startPosition: index
                  })
                }
            })
          },
          async onFollow () {
              this.isFollowloading = true
              if (this.article.is_followed) {
                  // 已关注的，取消关注
                await deleteFollow(this.article.aut_id)
              } else {
                  // 未关注的，变成已关注
                await addFollow(this.article.aut_id)
              }
              // 改变按钮状态
            this.article.is_followed = !this.article.is_followed
            this.isFollowloading = false
          },
          async onCollect () {
              this.$toast.loading({
                message: '操作中.....',
                forbidClick: true // 禁止背景点击
              })
            if (this.article.is_followed) {
              // 已收藏的
              await deleteCollect(this.articleId)
            } else {
              // 未已收藏的
              await addCollect(this.articleId)
            }
            // 改变按钮状态
            this.article.is_collected = !this.article.is_collected
            this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
          },
          async onLike () {
            this.$toast.loading({
              message: '操作中.....',
              forbidClick: true // 禁止背景点击
            })
            if (this.article.attitude === 1) {
              // 已点赞,再点就取消
              await deleteLink(this.articleId)
              this.article.attitude = -1

            } else {
              // 未点赞，点就点赞
              await addLink(this.articleId)
              this.article.attitude = 1
            }
            this.$toast.success(`${this.article.is_collected ? '' : '取消'}点赞成功`)
          },
          onPostSuccess (comment) {
              // 把发布成功的评论数据对象放到评论的顶部
              this.commentList.unshift(comment)
            // 更新评论的总数量
            this.totalCommentCount++
            // 关闭发布的弹出层
              this.isPostShow = false
             // console.log(comment)
          },
          onReplyClick (comment) {
              this.replyComment = comment
              //console.log('ononReplyClick', comment)
            // 展示回复弹框
            this.isReplyShow = true
          }
        }
    }
</script>

<style scoped lang="less">
.article-wrap{
  position: fixed;
  bottom: 44px;
  top: 46px;
  right: 0px;
  left: 0px;
  overflow-y: auto;
}
  .title{
    font-size: 14px;
    color: #3a3a3a;
    padding: 15px;
    background-color: #fff;
    margin: 0px;
  }
  .user-info{
    .avator{
      width: 35px;
      height: 35px;
      margin-right: 8px
    }
    .name{
      font-size: 12px;
      color: #333333
    }
    .pudate{
      font-size: 12px;
      color: #b4b4b4
    }
    .follow-btn{
      width: 85px;
      height: 29px;
    }
  }
  ul{
    list-style: unset;
  }
  .markdown-body{
    padding: 14px;
    background-color: #fff;

  }
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
    }
  }
</style>
