<template>
    <div class="layout-container">
      <!--子路由出口-->
      <router-view/>
      <!--子路由出口-->
      <!--底部导行栏-->
      <!--这里用到的是路由嵌套，父子路由-->
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">问答</van-tabbar-item>
        <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
      <!--底部导行栏-->
    </div>
</template>
<script>
    export default {
        name: 'LayoutIndex',
        components: {},
        props: {},
        data () {
            return {
              active: 0
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
