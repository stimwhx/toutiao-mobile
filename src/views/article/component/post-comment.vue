<template>
    <div class="post-comment">
      <!-- 去除输入空格 -->
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- 控制按钮的显示状态 -->
      <van-button
        size="small"
        @click="onPost"
        :disabled="!message"
      >发布</van-button>
    </div>
</template>
<script>
  import { addComment } from '@/api/comment'
    export default {
        name: 'PostComment',
        components: {},
        props: {
            target: {
                type: [Number, String, Object],
              required: true
            },
            articleId: {
                type: [Number, String, Object],
              default: null
            }
        },
        data () {
            return {
              message: '' // 文本框显示内容
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
            async onPost () {
                this.$toast.loading({
                  message: '加载中～～～',
                  forbidClick: true //禁止背景点击
                })
                const { data } = await addComment({
                  target: this.target.toString(),
                  content: this.message,
                  art_id: this.articleId ? this.articleId.toString() : null
                })
              // 把我们发送的内容，给父组件comment-list
              this.$emit('post-success', data.data.new_obj)
              this.$toast.success('发布成功')
              this.message = ''
            }
        }
    }
</script>

<style scoped lang="less">
  .post-comment{
    display: flex;
    align-items: center;
    padding: 14px;
  }
</style>
