<template>
   <!-- <div class="article-item">
      &lt;!&ndash;
      这是文章的公共组件，因为每个列表有很多的文章。每个文章可以用公共的组件。在文章列表里去加载这个组件。然后去使用。
      &ndash;&gt; {{ article.title }}
      文章列表</div>-->
  <van-cell
  class="article-item"
  :to="{
    name: 'article',
    params: {
        articleId: article.art_id
    }
  }"
  >
    <!-- van 提供了加载多少行然后省略，我们可以直接给用他的类名就可以用。van-multi-ellipsis--l3
    内置样式
    -->
    <div slot="title"
         class="title van-multi-ellipsis--l3"
    >{{ article.title }}</div>
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      width="116px"
      height="73px"
      src="article.cover.images[0]"
    />
    <div slot="label">
      <!--加一个放文章封面的容器-->
      <div
        v-if="article.cover.type === 3"
        class="cover-wrap"
      >
        <!--里边就是图片，注意这个只有在img为3的时间才展示的。所以我们要加if判断-->
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
        <van-image
          class="cover-item"
          fit="cover"
          :src="img"
        />
        </div>
      </div>
      <!--
      因为有三个图片时，我们是显示在文章标题和下边时间的中间。所以我们就给他放在label这个插槽里边
      我们把下边的label就是时间评论包起来。为了方便设置样式
      -->
      <div class="lable-wrap">
      <span>{{article.aut_name}}</span>
      <span>{{article.comm_count}}评论数</span>
      <span>{{article.pubdate | relativeTime }}</span>
      </div>
      <!--
      这个van-cell有默认的插槽，slot="default"，可以省略不写可以省略不给image加，默认的就是这个
      -->

    </div>
  </van-cell>
</template>
<script>
    export default {
        name: 'ArticleItem',
        components: {},
        props: {
          article: {
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
  .article-item {
    .title {
      font-size: 16px;
      color: #3a3a3a
    }
    /deep/ .van-cell__value {
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
    }
    .cover-wrap {
      display: flex;
      padding: 15px 0;
      .cover-wrap-item {
        flex: 1;
        height: 73px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item {
          width: 100%;
          height: 73px;
        }
      }
    }
    .lable-wrap {
      font-size: 11px;
      color: #b4b4b4;
    }
    .lable-wrap span {
      margin-right: 12px;
    }
  }
</style>
