<template>
    <div class="updata-gender">
      <van-picker
        title="标题"
        show-toolbar
        :default-index="defaultIndex"
        :columns="columns"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onChange"
      />
    </div>
</template>
<script>
  import { updataUserInfo } from '@/api/user'
  export default {
        name: 'UpdataGender',
        components: {},
        props: {
            value: {
                type: Number,
              required: true
            }
        },
        data () {
            return {
              columns: ['男', '女'],
              defaultIndex: this.value
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onChange (picker, value, index) {
                this.defaultIndex = index
          },
          async  onConfirm () {
            this.$toast({
              message: '保存中…………',
              forbidclick: true
            })
              await updataUserInfo({
                gender: this.defaultIndex
              })
              // 更新成功》修改父组件》关闭弹出层
              // 发布input事件，更新父组件v-model绑定的数据
              this.$emit('input', this.defaultIndex)
              this.$emit('close')
              this.$toast.success('保存成功')
          }
        }
    }
</script>

<style scoped lang="less">
</style>
