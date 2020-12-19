<template>
    <div class="user-profile">
      <!--导航栏，-->
      <!-- 导航栏 navbar组件-->
      <van-nav-bar
        class="nav-bar-app"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
      />
      <van-cell title="头像" is-link center>
        <van-image
          width="30"
          height="30"
          round
          fit="cover"
          :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"></van-cell>
      <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'"></van-cell>
      <van-cell title="生日" is-link :value="user.birthday"></van-cell>
      <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
        class="popupCss"
      >
        <!--
        组件上绑定v-model
        使用情况：父子组件的通信，是父往子组件中传数据，子组件还要修改这个数据时用。
        注意：用v-model 默认向子组件传值的名字是value，默认监听的事件名字是input
        写上这相当于我们写了两名
        :value="user.name"
        @input="user.name = $event"
        -->
        <!--
        .sync当有多个数据要同步更新时，可以用这个。v-model只能用一次，.sync可以用多次
        父组件中
        a.sync = 'user.name'
        上边这么声名后，在父组件中相于还临听着@update:a="user.name = $event"
        在子组件中
        props里声名接收：
        a: {
        type: ...
        }
        在子组件中向父组件中传数据
        this.$emit("update:a",0)
        注意：语法update:属性名
        属性名是你在props里声名接收的那个名字
        -->
        <update-name
          @close="isEditNameShow = false"
          v-model="user.name"
        />
      </van-popup>
    </div>
</template>
<script>
  import { getUserInfo } from '@/api/user'
  import UpdateName from './component/update-name'
    export default {
        name: 'UserProfile',
        components: {
          UpdateName
        },
        props: {},
        data () {
            return {
                user: {}, // 用户个人信息对象
              isEditNameShow: false
            }
        },
        computed: {},
        watch: {},
        created () {
            this.loadUserInfo()
        },
        mounted () {
        },
        methods: {
         async loadUserInfo () {
            const {data} = await getUserInfo()
           this.user = data.data
           console.log(this.user)
          }
        }
    }
</script>

<style scoped lang="less">
  .popupCss{
    background-color: #f5f7f9;
  }
</style>
