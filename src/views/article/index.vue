<template>
    <div class="article-container">文章详情</div>
</template>
<script>
  // 在组件中动太获取路由参数的方法有两种
  // 方式一： this.$route.params.articleID
  // 方式二： props 传参，推荐
  // this.articleId
    export default {
        name: 'ArticleIndex',
        components: {},
        props: {
          articleId: {
              type: String,
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
</style>
