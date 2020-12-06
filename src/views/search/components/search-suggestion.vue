<template>
    <div class="search-suggestion">
      <van-cell
        :title="str"
        icon="search"
        v-for="(str, index) in suggestions"
        :key="index"
      />
    </div>
</template>
<script>
  import { getSearchSuggestions } from '@/api/search'
    export default {
        name: 'SearchSuggestion',
        components: {},
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        data () {
            return {
              suggestions: [] // 请求联想数据的列表
            }
        },
        computed: {},
        watch: {
            // 在props里的属性名字，是这里的方法名字。就是要监视的数据的名称
          searchText: {
            async  handler () {
                  // 找到数据接口
              const { data } = await getSearchSuggestions(this.searchText)
                  // 请求获取数据
                  // 模板绑定展示
              this.suggestions = data.data.options
              },
            // 该回调将会在侦听开始之后被立即调用
            immediate: true
          }
        },
        created () {
        },
        mounted () {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
</style>
