<template>
    <div class="search-suggestion">
      <!--&lt;!&ndash; 原文输出 &ndash;&gt;
     <div>{{htmlStr}}</div>
      &lt;!&ndash; 将以html输出 &ndash;&gt;
      <div v-html="htmlStr"></div>-->
      <van-cell
        :title="str"
        icon="search"
        v-for="(str, index) in suggestions"
        :key="index"
      >
        <!-- 我们要使用v-html这个指令得在html的标签上。所以我们把van-cell里的：title="str"以插槽的形式展示-->
        <div slot="title" v-html="highlight(str)"></div>
      </van-cell>
    </div>
</template>
<script>
  import { getSearchSuggestions } from '@/api/search'
  import { debounce } from 'lodash'
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
              suggestions: [], // 请求联想数据的列表
              htmlStr: 'hello<span style="color: red">world</span>'
            }
        },
        computed: {},
        watch: {
            // 在props里的属性名字，是这里的方法名字。就是要监视的数据的名称
          searchText: {
              // 添加一个防抖动引入了一个包。 lodash这是javascript的第三方库，提供了很多方法
            // debounce(参数1函数，参数2时间) 返回值：防抖处理的函数
            handler: debounce(async function () {
              const { data } = await getSearchSuggestions(this.searchText)
              // 请求获取数据
              // 模板绑定展示
              this.suggestions = data.data.options
            }, 500),
           /* async  handler () {
                  // 找到数据接口
              const { data } = await getSearchSuggestions(this.searchText)
                  // 请求获取数据
                  // 模板绑定展示
              this.suggestions = data.data.options
              },*/
            // 该回调将会在侦听开始之后被立即调用
            immediate: true
          }
        },
        created () {
        },
        mounted () {
        },
        methods: {
          highlight (str) {
              // a /a/gi,vue /vue/gi
            // 正则表达式 /中间的内容/ 都会当做字符串来对待
            // 错误的写法： /this.searchText/gi
            // RegExp 是正则表达式的构造函数
            // 参数1：字符串，这个可以接受表达式
            // 参数2：匹配模式
            // 返回值：正则对象
            // 返回这个highlight的函数值，谁掉用谁绑定。这个值 g是匹配所有，i是不区分大小写
            return str.replace(
                new RegExp(this.searchText, 'gi'),
              `<span style="color: red">${this.searchText}</span>`
            )
          }
        }
    }
</script>

<style scoped lang="less">
</style>
