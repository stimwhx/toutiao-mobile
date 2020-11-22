<template>
    <div class="my-container">
      <!--Cell 单元格-->
      <van-cell-group
        v-if="user"
        class="my-info">
        <van-cell
          title="123"
          class="bass-info"
          center
          :border="false"
        >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div
            class="name"
            slot="title"
          >昵称</div>
          <van-butto
            class="update-btn"
            round
            size="small"
            >编辑资料</van-butto>
        </van-cell>
          <!--Grid 宫格-->
        <van-grid
          class="data-info"
          :border="false"
        >
          <van-grid-item class="data-info-item" >
            <div class="text-wrap"  slot="text">
              <div class="count">123</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <!--Slots自定义-->
            <div class="text-wrap" slot="text">
              <div class="count">123</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">123</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item" >
            <div  class="text-wrap" slot="text">
              <div class="count">123</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <div
        v-else
        class="no-login">
        <div  @click="$router.push('/login')" >
          <!--这里教师用的不是vant组件，这里用的就是image，我是为了用元脚用的vant组件-->
          <van-image
            class="mobile"
            round
            height="66"
            width="66"
            src="./no-loginimg.png"
          ></van-image>
        </div>
        <div class="text">未登录</div>
      </div>
      <van-grid column-num="2" class="nav-grid mb-4">
        <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>
      <van-cell title="消息通知" is-link to="/"/>
      <van-cell class="mb-4" title="小智同学" is-link to="/" />
      <!--判断有这个本地有这个user我们就显示登录，没有就不显示-->
      <!--is-link to="/"-->
      <van-cell v-if="user" class="logout-cell" title="退出登录"  @click="onLogout"/>
    </div>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        name: 'MyIndex',
        components: {},
        props: {},
        data () {
            return {}
        },
        computed: {
          ...mapState(['user'])
        },
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {
          onLogout () {
            this.$dialog.confirm({
              title: '退出登录',
              message: '确认退出么！！'
            })
              .then(() => { // 确认走这里
                // 确认退出了我们就走这里，这时我们要把登录状态给清空
                this.$store.commit('setUser', null)
                // on confirm
              })
              .catch(() => {
                // on cancel
              })
          }
        }
    }
</script>

<style scoped lang="less">
  .my-container{
    .my-info{
      background: url("./banner.png") no-repeat;
      .bass-info{
        box-sizing: border-box;
        height: 115px;
        background-color: unset;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar{
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }
        .name{
          color: #fff;
          font-size:15px;
        }
        .update-btn{
          height: 16px;
          font-size: 10px;
          color:#666666;
        }
      }
      .data-info{
        .data-info-item{
          height: 65px;
          color: #ffffff;
          .text-wrap{
            display: flex;
            flex-direction: column;
            justify-content: center;
            .count{
              font-size: 18px;
            }
            .text{
              font-size: 11px;
            }
          }
        }
      }
      /deep/.van-grid-item__content{
        background-color: unset;
      }
    }
    .no-login{
      background: url(./banner.png);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background-size: cover;
      .mobile{
        height: 66px;
        width: 66px;
      }
      .text{
        color: #fff;
        font-size: 14px;
      }

    }
      /deep/.nav-grid{
        .nav-grid-item{
          height: 70px;
          .toutiao{
            font-size: 22px;
          }
          .toutiao-shoucang{
            color: #eb5253;
          }
          .toutiao-lishi{
            color: #ff9d1d;
          }
          .van-grid-item__text{
            font-size:14px;
            color: #333333;
          }
      }
    }
    .logout-cell{
      text-align: center;
      color: #d86262;
    }
    .mb-4{
      margin-bottom:4px;
    }

  }
</style>
