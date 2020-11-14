<template>
  <div id="app">
    <h1>黑马头条</h1>
    <router-view/>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div style="pading: 30px" class="box" >
     hello
    </div>
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
    <i class="toutiao toutiao-fenxiang"></i>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
</style>
