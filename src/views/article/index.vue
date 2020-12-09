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
          :type="article.is_followed ? 'default' : 'info' "
          round
          size="small"
          :icon="article.is_followed ? '' : 'plus' "
        >{{ article.is_followed ? '己关注' : '关注' }}</van-button>
      </van-cell>
      <div class="markdown-body"
      v-html="article.content"
      >

      </div>
    </div>
</template>
<script>
  // 在组件中动太获取路由参数的方法有两种
  // 方式一： this.$route.params.articleID
  // 方式二： props 传参，推荐
  // this.articleId
  import './github-markdown.css'
  import { getArticleById } from '@/api/article'
    export default {
        name: 'ArticleIndex',
        components: {},
        props: {
          articleId: {
              type: [Number, String, Object],
            required: true
          }
        },
        data () {
            return {
                article: {} // 文章详情
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
              const { data } = await getArticleById(this.articleId)
            this.article = data.data
          }
        }
    }
</script>

<style scoped lang="less">

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
</style>
