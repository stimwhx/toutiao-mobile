<template>
    <div class="update-name">
      <van-nav-bar
        title="昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onClickRight"
      >
      </van-nav-bar>
      <div class="name-wrap">
        <van-field
          v-model="loadName"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </div>
</template>
<script>
  import { updataUserInfo } from '@/api/user'
    export default {
        name: 'UpdateName',
        components: {},
        props: {
            value: {
                type: String,
              required: true
            }
        },
        data () {
            return {
                loadName: this.value
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          async  onClickRight () {
              this.$toast({
                message: '保存中…………',
                forbidclick: true
              })
            try {
                  await updataUserInfo({
                      name: this.loadName
                  })
              // 更新成功》修改父组件》关闭弹出层
              // 发布input事件，更新父组件v-model绑定的数据
              this.$emit('input', this.loadName)
              this.$emit('close')
              this.$toast.success('保存成功')
            } catch (err) {
                  if (err && err.response && err.response.status === 409) {
                      this.$toast.fail('用户昵称已存在')
                  }
            }
          }
        }
    }
</script>
<style scoped lang="less">
  .name-wrap{
    padding: 10px;
  }
</style>
