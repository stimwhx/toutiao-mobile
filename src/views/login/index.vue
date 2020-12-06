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
        @submit="onlogin"
        ref="login-form"
      >
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="输入用户名"
          :rules="formRules.mobile"
          name="mobile"
          center
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="输入验证码"
          :rules="formRules.code"
          name="code"
          center
        >
          <template #button>
            <!--CountDown 倒计时-->
            <van-count-down :time="1000 * 60"
                            format="ss s"
                            v-if="isDowncount"
                            @finish="isDowncount = false"
            />
            <van-button
              v-else
              class="send-btn"
              size="small"
              round
              @click.prevent="onSendSms"
              :loading="isSendLoading"
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
import { login, sendSms } from '@/api/user'
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
        },
        isDowncount: false, // 控制倒计时的显示状态
        isSendLoading: false // 控制点击发送验证码后，让按钮loading。避免发送多余请求
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
          // 触构
        const { data } = await login(this.user)
        // 4、处理响应结果

          // 成功弹登录成功的tost
        Toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        //登录成功后，回到来的页面
        this.$router.back() // 以后会改的

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

    },
    async onSendSms () {
        // 校验证手机号码 先通过ref拿到表单,通过validate函数定义自己要校验的内容
      // 1、通过在@click.prevent 强制去掉默认触发的提交表单操作
      // 2、通过在个行加上name属性来只对这一行校验
      // 3、在validate中输入表单行中的名字，就走data中定义formrules里的相应的校验规则了。
      // try里的代码任何错误都会被catch捕获
      // 我们要在catch里对不同错误给出想应的提示
      try {
        await this.$refs['login-form'].validate('mobile')
         const res = await sendSms(this.user.mobile)
        this.isDowncount = true
      } catch (err) {
          // 1、定义一个供用的 message消息，然后去判断不同的错误类型。去给这个message 负值。最后才去弹出toast提示
        let message = ''
        if(err && err.response && err.response.status === 429) {
            message = '发 送太频繁了，请稍后再试'
        }else if(err.name === 'mobile') {
            message = err.message
        }else{
            message = '发送失败，请稍后再试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 验证通过 -》 请求发送验证码-》用户收到短信-》输入验证码》请求登录
      // 请求发送验证码-》隐藏发送按钮，显示倒计时
      // 倒计时结束-》隐藏倒计时按钮，显示发送按钮
      //不论发送验证码是否成功，我们都要让loading状态结束
      this.isSendLoading = false
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
