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
        <van-grid-item
          class="grid-item"
          v-for ="(channel,index) in userChannels"
          :key="index"
          :text="channel.name"
          :icon="(isEdit && index !== 0) ? 'clear' : ''"
          @click="onUserChannelEdit(index)"
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
  import { getAllChannels } from '@/api/channel'
    export default {
        name: 'ChannelEdit',
        components: {},
        props: {
          userChannels: {
            type: Array,
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
          onAdd (channel) {
             this.userChannels.push(channel)
          },
          onUserChannelEdit (index) {
             if (this.isEdit && index !== 0) {
                 // 编辑按钮变为完成，执行删除操作
               this.deleteChannel(index)
             }else{
                 // 执行切换频道
               this.switchChannel(index)
             }
          },
          deleteChannel (index) {
             // 删除数组中的元素，index表示从第几个开始包含此位置的元素，1表示删除几个。省略就是删除到最后
             this.userChannels.splice(index, 1)
          },
          switchChannel (index) {
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
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top:0;
        }
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

</style>
