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
      <!--
      基于vant的表单验
      1、使用van-from包裹所有的表单项van-field
      2、给van-from绑定submit事件
      当表单提交时会触发submit事件
      提示：只有表单难通过，它才会调用submit
      3、使用field的rules属性定义校验规则
      -->
      <van-form
        :show-error-message="false"
        :show-error="false"
        :submit-on-enter="true"
        validate-first
        @failed="onfailed"
        @submit="onlogin">
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="输入用户名"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="输入验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-button
              class="send-btn"
              size="small"
              round
            >获取验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button
            class="login-btn"
            type="info"
            block
          >登录</van-button>
        </div>
      </van-form>
      <!-- block块级属性，按钮横向填充满-->
      <!-- 登录表单-->
    </div>
</template>
<script>
import { login } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
      return {
          user: {
              mobile: '', // 手机号
              code: '' // 验证码
          },
        formRules: {
          mobile: [
            {required: true, message: '请填写用户名'},
            {pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误'}
          ],
          code: [
            {required: true, message: '请填验证码'},
            {pattern: /\d{6}$/, message: '验证码格式错误'}
          ]
        }
      }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onlogin () {
        // 调用这个就是点击了登录了。因为结果没有返回。我们就让他加载
      Toast.loading({
        message: '加载中...',
        forbidClick: true, // 是否禁止背景点击 当出现加载时禁止点击后面的功能
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
        // 1  、找到数据接口
      // 2、封装请示方法

      // 3、请示调用登录
      try {
        const res = await login(this.user)
        // 4、处理响应结果
        console.log(res)
          // 成功弹登录成功的tost
        Toast.success('登录成功')

      } catch (err) {
        console.log(err)
        Toast.fail('登录失败')
      }
    },
    onfailed (error) {
        if (error.errors[0]) {
          this.$toast({
            message: error.errors[0].message,
            position: 'top'
          })
        }

    }
  }
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
