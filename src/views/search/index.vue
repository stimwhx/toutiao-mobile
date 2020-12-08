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
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
      </form>
      <!-- 搜索结果 -->
      <search-result
        v-if="isResultShow"
        :search-text="searchText"
      />
      <!-- /搜索结果 -->

      <!-- /搜索 -->

      <!-- 联想建议 -->
      <!--
      点击联想建议里的关键字，进行搜索
       先在子组件里定义一个点击事件，然后$emit('父组件中，子组件的方法名字','要给父组件传的值')
       在父组件中调用这个方法，触发父组件的方法。
       -->
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @search="onSearch"
      />
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <search-history
        v-else
        :searchHistories="searchHistories"
        @search="onSearch"
        @updata-histories="searchHistories = $event"
      />
      <!-- /历史记录 -->

    </div>
</template>
<script>
  import SearchSuggestion from './components/search-suggestion'
  import SearchHistory from './components/search-history'
  import SearchResult from './components/search-result'
  import { setItem, getItem} from '@/utile/storage'
  import { getSearchHistories } from '@/api/search'
  import { mapState } from 'vuex'
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
              isResultShow: false, // 控制结果列表的展示
              searchHistories: [] // 历史记录里的列表项
            }
        },
        computed: {
          ...mapState(['user'])
        },
        watch: {
            // 我们在这里监视，只要是这个数据有变像我们就更新本地存储。  可以把父子组件的相同的内容注释掉了就
          searchHistories () {
            setItem('search-histories', this.searchHistories)
          }
        },
        created () {
            this.loadSearchHistories()
        },
        mounted () {
        },
        methods: {
          onSearch (serchTextarg) {
              // 把输入框设置为你要搜索的文本
              this.searchText = serchTextarg
            // 实现我们搜索后，把我们搜索过的文本放在历史记录列表里
            // 1、 去搜索一下历史记录里是不是有我们这个结果
            const index = this.searchHistories.indexOf(serchTextarg)
            // 2、看这个index 是不是存在。 如果存在就删除之前存放的。把这个新的存放在顶上
            if (index !== -1) {
                  // 不等于负1，说明以存在，我们要删除
              // splice(index,1)  从index开始删除，删除一个。包含index位置
              this.searchHistories.splice(index, 1)
            }
            // 3、最后添加到顶上
            this.searchHistories.unshift(serchTextarg)
              // 点击搜索后，显示结果列表
            this.isResultShow = true
            // 搜索的同时，放到本地存储。用户如果在线，我们一边搜索后，后台会给我们存的。
            //  setItem('search-histories', this.searchHistories)
          },
          /*onCancel () {
          如果不用$router.back()可以在这里实现调用方法跳回到取消前界面
              console.log('onCancel')
          }*/
          async  loadSearchHistories () {
              // 我们让后端返回的史历记录+本地的合并在一起
            //如果用户已登录我们才取线上的
            // 取出本地存储
            let searchHistories = getItem('search-histories') || []
            if (this.user) {
                // 有这个表示已经登录了
               const { data } = await getSearchHistories()
              // 合并数组：【。。。数组，。。。数组】
              // 把Set转为数组 【。。。new Set()】
              // 数组去重 【。。。new Set([...数组，。。。数组])】
              searchHistories = [...new Set([
                ...searchHistories,
                ...data.data.keywords
              ])]
            }
            this.searchHistories = searchHistories
          }
        }
    }
</script>

<style scoped lang="less">
</style>
