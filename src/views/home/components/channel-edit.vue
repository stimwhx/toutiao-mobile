<template>
    <div class="channel-edit">
      <van-cell center :border="false">
        <div slot="title"  class="channel-title">我的频道</div>
        <van-button
          round
          plain
          type="danger"
          size="mini"
          @click="isEdit = !isEdit"
        >{{ isEdit ? '完成': '编辑' }}</van-button>
      </van-cell>
      <van-grid :gutter="10">
        <!--
        active为类名字，后边的是条件，真就是显示这个类名定义的属性。为假就不显示
：class = {'active：dadactive === index'}
        -->
        <van-grid-item
          class="grid-item"
          :class = "{active: index === active}"
          v-for ="(channel,index) in userChannels"
          :key="index"
          :text="channel.name"
          :icon="(isEdit && index !== 0) ? 'clear' : ''"
          @click="onUserChannelEdit(channel, index)"
        />
      </van-grid>
      <!--allchannel-->
      <van-cell center :border="false">
        <div slot="title"  class="channel-title">推荐频道</div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for ="(channel,index) in recommendChannels"
          :key="index"
          :text="channel.name"
          @click="onAdd(channel)"
        />
      </van-grid>
    </div>
</template>
<script>
  import {
    getAllChannels,
    addUserChannel,
    deleteUserChannel
  } from '@/api/channel'
  import { mapState } from 'vuex'
  import { setItem } from '@/utile/storage'
    export default {
        name: 'ChannelEdit',
        components: {},
        props: {
          userChannels: {
            type: Array,
            required: true
          },
          active: {
              type: Number,
              required: true
          }
        },
        data () {
            return {
              allChannels: [], //所有频道数据列表
              isEdit: false
            }
        },
        computed: {
          ...mapState(['user']),
            // 基于已有的属性，衍生出一些新的数据出来就是需要一些逻辑
            // 计算属性会观测内部依赖的数据人变化而重新求职  （内部数据就是data里的数据）
            recommendChannels () {
                // 思路 所有频道-我的频道=剩下频道
              // filter 方法： 根据返回的Boolean值收集元素，为真收集，为假不收集。  返回结果类型为一个数组
              return this.allChannels.filter(channel => {
                  // 判断当前遍历的频道是不是属于我的频道
                return !this.userChannels.find(userChannel => {
                    // 找到满足条件的频道，然后我们找到为真我们非一下返回。让这个值为假。就不收集这个元素了。
                      return userChannel.id === channel.id
                })
              })
            }
        },
        watch: {},
        created () {
          this.loadAllChannels()
        },
        mounted () {
        },
        methods: {
         async loadAllChannels () {
             const { data } = await getAllChannels()
             this.allChannels = data.data.channels

         },
         async onAdd (channel) {
             this.userChannels.push(channel)
            // 数据持久化
            if (this.user) {
                 // 登录了，数据存储到线上
            await addUserChannel({
              channels: [
                {id: channel.id, seq: this.userChannels.length}
                ]
              })
            } else {
                // 没有登录，数据存储到本地
              setItem('user-channels', this.userChannels)
            }
          },
          onUserChannelEdit (channel, index) {
             if (this.isEdit && index !== 0) {
                 // 编辑按钮变为完成，执行删除操作
               this.deleteChannel(channel, index)
             }else{
                 // 执行切换频道
               this.switchChannel(index)
             }
          },
          async deleteChannel (channel, index) {
             // 更新删除后的当前激活索引。因为删除激活之前的频道要让现在的激活频道的index减去1
            if (index <= this.active) {
                this.$emit('update-active', this.active - 1)
            }
             // 删除数组中的元素，index表示从第几个开始包含此位置的元素，1表示删除几个。省略就是删除到最后
             this.userChannels.splice(index, 1)
            if (this.user) {
               await deleteUserChannel(channel.id)
            } else {
              setItem('user-channels', this.userChannels)
            }
          },
          switchChannel (index) {

             // 完成切换频道,还是子组件向父组件传值，这次用到了传参数.把index传过去，好选中那个频道
            this.$emit('update-active', index)
             // 在子组件中用$emit声明我们要让父组件监听的方法
             this.$emit('close')
             console.log(index)
          }
        }
    }
</script>

<style scoped lang="less">
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: #333333;
    }
    .grid-item {
      width: 80px;
      height: 43px;
      /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        border: none;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top:0;
        }
      }
      /deep/.van-grid-item__icon {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #ccc;
      }
    }
    .active {
      /deep/ .van-grid-item__text {
        color: red !important;
      }
    }
  }
</style>
