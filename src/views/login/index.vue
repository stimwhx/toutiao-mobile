<template>
    <div class="login-container">
      <!-- 导航栏 navbar组件-->
      <van-nav-bar
        class="nav-bar-app"
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 导航栏-->
      <!-- 登录表单 field组件-->
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="输入用户名"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="输入验证码"
        >
          <template #button>
            <van-button
              class="send-btn"
              size="small"
              round
            >获取验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- block块级属性，按钮横向填充满-->
      <div class="login-btn-wrap">
        <van-button  class="login-btn" type="info" block >登录</van-button>
      </div>

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
  .login-container{
    .send-btn{
      width: 80px;
      height: 23px;
      background-color: #ededed;
      .van-button__text{
        font-size: 11px;
        color: #666666;
      }
    }
    .login-btn-wrap{
      padding: 26px 16px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
        .van-button__text{
          font-size: 15px;
        }
      }
    }

  }

</style>
