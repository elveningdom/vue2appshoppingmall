<template>
  <div id="app">
    <nav v-show="$store.state.isShowNav">
      <router-link to="/" exact>
        <span class="icon iconfont icon-shouye"></span><br />
        首页
      </router-link>
      <router-link to="/shoppingcar">
        <span class="icon iconfont icon-03"></span><br />
        购物车</router-link>

      <router-link to="/class">
        <span class="icon iconfont icon-fenlei"></span><br />
        分类</router-link>
      <router-link to="/mine">
        <span class="icon iconfont icon-wode"></span><br />
        我的</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import {userinfo} from "./mixins/userinfo.js"
export default {
  mixins:[userinfo],
data(){
  return{

  }
},
created(){
  console.log(this.userid)
  this.shoppingcarAllQuery({userid:this.userid})
  this.addressAllQuery({userid:this.userid})
},
methods:{
  ...mapActions("shoppingcar",["shoppingcarAllQuery"]),
  ...mapActions("address",["addressAllQuery"])
}
}
</script>
<style lang="scss">
nav {
  display: flex;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 18px;
  background-color: #fff;
  height: 49px;
  z-index: 10;

  a {
    flex: 1;
    color: #7e8c8d
  }

  .icon {
    font-size: 24px;
  }
}

a.router-link-active {
  color: #7f4395;
}
</style>
