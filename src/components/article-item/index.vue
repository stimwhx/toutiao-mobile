<template>
    <div class="article-item">
      <!--
      这是文章的公共组件，因为每个列表有很多的文章。每个文章可以用公共的组件。在文章列表里去加载这个组件。然后去使用。
      -->
      文章列表</div>
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
</style>
