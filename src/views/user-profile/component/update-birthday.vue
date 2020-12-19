<template>
    <div class="update-birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </div>
</template>
<script>
  import dayjs from 'dayjs'
  import { updataUserInfo } from '@/api/user'
    export default {
        name: 'UpdateBirthday',
        components: {},
        props: {
            value: {
                type: String,
              required: true
            }
        },
        data () {
            return {
              minDate: new Date(1990, 0, 1),
              maxDate: new Date(2025, 10, 1),
              currentDate: new Date(this.value)
            }
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          async  onConfirm () {
            this.$toast({
              message: '保存中…………',
              forbidclick: true
            })
            const date = dayjs(this.currentDate).format('YYYY-MM-DD')
            await updataUserInfo({
              birthday: date
            })
            // 更新成功》修改父组件》关闭弹出层
            // 发布input事件，更新父组件v-model绑定的数据
            this.$emit('input', date)
            this.$emit('close')
            this.$toast.success('保存成功')
          }
        }
    }
</script>

<style scoped lang="less">
</style>
