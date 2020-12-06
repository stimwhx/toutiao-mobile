<template>
    <div class="home-container">
      <!-- 搜索 -->
      <!--
      在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS、安卓也可以 输入法中显示搜索按钮。
      -->
      <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
      </form>
      <!-- 搜索结果 -->
      <search-result v-if="isResultShow"/>
      <!-- /搜索结果 -->

      <!-- /搜索 -->

      <!-- 联想建议 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
      />
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <search-history v-else/>
      <!-- /历史记录 -->

    </div>
</template>
<script>
  import SearchSuggestion from './components/search-suggestion'
  import SearchHistory from './components/search-history'
  import SearchResult from './components/search-result'
    export default {
        name: 'HomeIndex',
        components: {
          SearchSuggestion,
          SearchHistory,
          SearchResult
        },
        props: {},
        data () {
            return {
              searchText: '', // 搜索内容
              isResultShow: false
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onSearch () {
              // 点击搜索后，显示结果列表
            this.isResultShow = true
              console.log('onSearch')
          }
          /*onCancel () {
          如果不用$router.back()可以在这里实现调用方法跳回到取消前界面
              console.log('onCancel')
          }*/
        }
    }
</script>

<style scoped lang="less">
</style>
