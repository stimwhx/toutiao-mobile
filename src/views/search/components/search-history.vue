<template>
    <div class="search-history">
      <van-cell
        title="历史记录"
      >
        <div
          v-if="isDeleteShow">
          <!--
          prop 数据如果是引用类型（数组，对像）可以修改，注意这个修改指的是user.name='jack'  arr.push(123)\ arr.splice(0,1)

          但是任何 prop 数据都不能重新赋值： xxx=xxx

          如果想要修改prop里 的数据让父组件自己修改。
          -->
          <span
          @click="$emit('updata-histories', [])"
          >全部删除</span>
          <span
            @click="isDeleteShow = false"
          >完成</span>
        </div>
        <van-icon
          name="delete"
          @click="isDeleteShow = true"
          v-else
        />
      </van-cell>
      <van-cell
        :title="history"
        v-for="(history, index) in searchHistories"
        :key="index"
        @click="onDelete(history, index)"
      >
        <van-icon
          v-show="isDeleteShow"
          name="close"
        />
      </van-cell>
    </div>
</template>
<script>
    // import { setItem } from '@/utile/storage'
    export default {
        name: 'SearchHistory',
        components: {},
        props: {
          searchHistories: {
              type: Array,
            required: true
          }
        },
        data () {
            return {
                isDeleteShow: false
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onDelete (history, index) {
              // 只有在删除状态下我们才执行删除
            if (this.isDeleteShow) {
                this.searchHistories.splice(index, 1)
              // 数据持久话
              // 1、修改本地存储
              // 2、 请求接口删除线上的数据
              // setItem('search-histories', this.searchHistories)
              return
            }
            // 当不是删除状态时，我们点击历史记录。会展示搜索结果
            // 这个我们要用到父组件的onSearch方法
            // 父与子组件的通信
            this.$emit('search', history)

          }
        }
    }
</script>

<style scoped lang="less">
</style>
