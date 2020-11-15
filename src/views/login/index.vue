<template>
    <div class="login-container">
      <!-- 导航栏 navbar组件-->
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 导航栏-->
      <!-- 登录表单 field组件-->
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          left-icon="smile-o"
          placeholder="输入用户名"
        />
        <van-field
          v-model="user.code"
          clearable
          left-icon="music-o"
          placeholder="输入验证码"
        >
          <template #button>
            <van-button
              size="small"
              round
            >发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 登录表单-->
    </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
      return {
          user: {
              mobile: '', // 手机号
              code: '' // 验证码
          }
      }
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
